<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

// Set content type
header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$config = [
    'to_email' => 'your-email@example.com', // Ganti dengan email Anda
    'to_name' => 'Nama Anda',
    'subject_prefix' => '[Portfolio Contact] ',
    'max_message_length' => 1000,
    'allowed_domains' => [], // Kosongkan untuk mengizinkan semua domain
];

// Response function
function sendResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Validate and sanitize input
function validateInput($data) {
    $errors = [];
    
    // Name validation
    if (empty($data['name'])) {
        $errors[] = 'Nama wajib diisi';
    } elseif (strlen($data['name']) < 2) {
        $errors[] = 'Nama minimal 2 karakter';
    } elseif (strlen($data['name']) > 50) {
        $errors[] = 'Nama maksimal 50 karakter';
    }
    
    // Email validation
    if (empty($data['email'])) {
        $errors[] = 'Email wajib diisi';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Format email tidak valid';
    }
    
    // Subject validation
    if (empty($data['subject'])) {
        $errors[] = 'Subject wajib diisi';
    } elseif (strlen($data['subject']) > 100) {
        $errors[] = 'Subject maksimal 100 karakter';
    }
    
    // Message validation
    if (empty($data['message'])) {
        $errors[] = 'Pesan wajib diisi';
    } elseif (strlen($data['message']) < 10) {
        $errors[] = 'Pesan minimal 10 karakter';
    } elseif (strlen($data['message']) > 1000) {
        $errors[] = 'Pesan maksimal 1000 karakter';
    }
    
    return $errors;
}

// Sanitize data
function sanitizeData($data) {
    return [
        'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
        'email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        'subject' => htmlspecialchars(trim($data['subject']), ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8')
    ];
}

// Rate limiting (simple implementation)
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'];
    $file = 'temp/rate_limit_' . md5($ip) . '.txt';
    $dir = dirname($file);
    
    // Create temp directory if it doesn't exist
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $current_time = time();
    $limit_time = 300; // 5 minutes
    $max_attempts = 5;
    
    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true);
        
        // Clean old attempts
        $data['attempts'] = array_filter($data['attempts'], function($time) use ($current_time, $limit_time) {
            return ($current_time - $time) < $limit_time;
        });
        
        if (count($data['attempts']) >= $max_attempts) {
            return false;
        }
        
        $data['attempts'][] = $current_time;
    } else {
        $data = ['attempts' => [$current_time]];
    }
    
    file_put_contents($file, json_encode($data));
    return true;
}

// Check if honeypot field is filled (bot protection)
function checkHoneypot($data) {
    return empty($data['website'] ?? ''); // Honeypot field should be empty
}

// Main processing
try {
    // Check rate limiting
    if (!checkRateLimit()) {
        sendResponse(false, 'Terlalu banyak percobaan. Silakan coba lagi dalam 5 menit.');
    }
    
    // Get POST data
    $input_data = [
        'name' => $_POST['name'] ?? '',
        'email' => $_POST['email'] ?? '',
        'subject' => $_POST['subject'] ?? '',
        'message' => $_POST['message'] ?? '',
        'website' => $_POST['website'] ?? '' // Honeypot field
    ];
    
    // Check honeypot
    if (!checkHoneypot($input_data)) {
        sendResponse(false, 'Spam terdeteksi.');
    }
    
    // Validate input
    $errors = validateInput($input_data);
    if (!empty($errors)) {
        sendResponse(false, 'Validasi gagal: ' . implode(', ', $errors));
    }
    
    // Sanitize data
    $data = sanitizeData($input_data);
    
    // Prepare email
    $to = $config['to_email'];
    $subject = $config['subject_prefix'] . $data['subject'];
    
    // Email body
    $body = "
    <html>
    <head>
        <title>Pesan Baru dari Portfolio</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #667eea; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Pesan Baru dari Portfolio Website</h2>
            </div>
            <div class='content'>
                <div class='info'>
                    <strong>Nama:</strong> {$data['name']}
                </div>
                <div class='info'>
                    <strong>Email:</strong> {$data['email']}
                </div>
                <div class='info'>
                    <strong>Subject:</strong> {$data['subject']}
                </div>
                <div class='info'>
                    <strong>Pesan:</strong><br>
                    " . nl2br($data['message']) . "
                </div>
                <div class='info'>
                    <strong>Waktu:</strong> " . date('d/m/Y H:i:s') . "
                </div>
                <div class='info'>
                    <strong>IP Address:</strong> {$_SERVER['REMOTE_ADDR']}
                </div>
            </div>
            <div class='footer'>
                <p>Email ini dikirim otomatis dari website portfolio Anda.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Portfolio Website <noreply@yourdomain.com>',
        'Reply-To: ' . $data['name'] . ' <' . $data['email'] . '>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    // Send email
    $mail_sent = mail($to, $subject, $body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        // Log successful submission
        $log_entry = date('Y-m-d H:i:s') . " - Email sent from: {$data['email']} - Subject: {$data['subject']}" . PHP_EOL;
        file_put_contents('temp/contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        sendResponse(true, 'Pesan berhasil dikirim! Terima kasih atas pesan Anda.');
    } else {
        throw new Exception('Gagal mengirim email');
    }
    
} catch (Exception $e) {
    // Log error
    $error_log = date('Y-m-d H:i:s') . " - Error: " . $e->getMessage() . PHP_EOL;
    file_put_contents('temp/error_log.txt', $error_log, FILE_APPEND | LOCK_EX);
    
    sendResponse(false, 'Terjadi kesalahan sistem. Silakan coba lagi nanti.');
}
?>
