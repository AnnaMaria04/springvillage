<?php
/**
 * Приём заявок с форм сайта на хостинге REG.RU.
 *
 * Зачем это здесь: сайт собирается статически и лежит на REG.RU, поэтому
 * серверных маршрутов Next.js на проде нет. Раньше формы стучались на Vercel —
 * это и не работало (хост отвечает редиректом), и уводило персональные данные
 * за пределы РФ. Теперь заявка обрабатывается на том же сервере и уходит
 * письмом на почту владельца: данные не покидают Россию и нигде не хранятся.
 *
 * Маршруты /api/lead и /api/contact ведут сюда через .htaccess.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const MAILBOX = 'springvillage@yandex.ru';
// Адрес отправителя должен быть на домене сайта, иначе письмо уйдёт в спам.
const FROM = 'noreply@springvillage.ru';

// Без возвращаемого типа never — он появился только в PHP 8.1,
// а на шаред-хостинге может стоять более старая версия.
function fail($status, $message) {
    http_response_code($status);
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Method not allowed');
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '' || strlen($raw) > 20000) {
    fail(400, 'Пустой или слишком большой запрос');
}

$body = json_decode($raw, true);
if (!is_array($body)) {
    fail(400, 'Некорректный формат запроса');
}

/** Обрезаем и чистим: в заголовки письма не должны попадать переводы строк. */
function field(array $body, $key, $max) {
    $value = isset($body[$key]) && is_scalar($body[$key]) ? (string) $body[$key] : '';
    $value = trim($value);
    $value = str_replace(["\r", "\n", "\0"], ' ', $value);
    return mb_substr($value, 0, $max);
}

// Согласие на обработку ПД обязательно (152-ФЗ): без него заявку не принимаем.
if (($body['consent'] ?? null) !== true) {
    fail(422, 'Требуется согласие на обработку персональных данных');
}

$type    = ($_GET['type'] ?? 'lead') === 'contact' ? 'contact' : 'lead';
$name    = field($body, 'name', 100);
$phone   = field($body, 'phone', 20);
$email   = field($body, 'email', 150);
$message = mb_substr(trim((string) ($body['message'] ?? '')), 0, 2000);
$source  = field($body, 'source', 50);

if ($name === '') {
    fail(422, 'Укажите имя');
}
if ($type === 'lead' && $phone === '') {
    fail(422, 'Укажите телефон');
}
if ($type === 'contact' && ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL))) {
    fail(422, 'Укажите корректный e-mail');
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email = '';
}

$subject = $type === 'contact'
    ? 'Сообщение с сайта Spring Village'
    : 'Заявка на бронирование — Spring Village';

$lines = [
    $type === 'contact' ? 'Новое сообщение с сайта' : 'Новая заявка на бронирование',
    '',
    'Имя: ' . $name,
];
if ($phone !== '')   { $lines[] = 'Телефон: ' . $phone; }
if ($email !== '')   { $lines[] = 'E-mail: ' . $email; }
if ($source !== '')  { $lines[] = 'Источник: ' . $source; }
$lines[] = 'Согласие на обработку ПД: да';
$lines[] = 'Получено: ' . date('d.m.Y H:i');
if ($message !== '') {
    $lines[] = '';
    $lines[] = $message;
}

$headers = [
    'From: Spring Village <' . FROM . '>',
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = @mail(MAILBOX, $encodedSubject, implode("\n", $lines), implode("\r\n", $headers));

if (!$sent) {
    // Честная ошибка: форма покажет телефон и предложит позвонить.
    fail(502, 'Не удалось отправить. Пожалуйста, позвоните нам.');
}

http_response_code($type === 'contact' ? 200 : 201);
echo json_encode(['ok' => true, 'success' => true], JSON_UNESCAPED_UNICODE);
