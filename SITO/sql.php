<?php
// Script di diagnostica e riparazione per messaggi chat privati non ricevuti
// Inserisci qui i dati di connessione al tuo database
$servername = "localhost";
$username = "tuo_username_db";
$password = "tua_password_db";
$dbname = "nome_database_sito";

// Crea connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

echo "Diagnostica sistema di chat in corso...<br><br>";

// 1. Controlla se la tabella dei messaggi esiste
$table_check = $conn->query("SHOW TABLES LIKE 'private_messages'");
if ($table_check->num_rows == 0) {
    echo "ERRORE: Tabella 'private_messages' non trovata. Creazione in corso...<br>";
    $create_table = "CREATE TABLE private_messages (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        sender_id INT(6) NOT NULL,
        receiver_id INT(6) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_delivered TINYINT(1) DEFAULT 0,
        INDEX receiver_index (receiver_id),
        INDEX delivered_index (is_delivered)
    )";
    
    if ($conn->query($create_table) === TRUE) {
        echo "Tabella 'private_messages' creata con successo.<br>";
    } else {
        echo "Errore creazione tabella: " . $conn->error . "<br>";
    }
} else {
    echo "✓ Tabella messaggi esistente verificata.<br>";
}

// 2. Controlla e aggiunge colonne mancanti se necessario
$columns_check = $conn->query("DESCRIBE private_messages");
$expected_columns = ['id', 'sender_id', 'receiver_id', 'message', 'timestamp', 'is_delivered'];
$existing_columns = [];
while ($row = $columns_check->fetch_assoc()) {
    $existing_columns[] = $row['Field'];
}

$missing_columns = array_diff($expected_columns, $existing_columns);
if (!empty($missing_columns)) {
    echo "Aggiunta colonne mancanti: " . implode(', ', $missing_columns) . "<br>";
    foreach ($missing_columns as $column) {
        if $column == 'is_delivered') {
            $conn->query("ALTER TABLE private_messages ADD COLUMN is_delivered TINYINT(1) DEFAULT 0");
        }
    }
}

// 3. Controlla messaggi non recapitati
$undelivered = $conn->query("SELECT COUNT(*) as count FROM private_messages WHERE is_delivered = 0");
$undelivered_count = $undelivered->fetch_assoc()['count'];
echo "Messaggi in coda non recapitati: " . $undelivered_count . "<br>";

// 4. Ripristina messaggi non recapitati
if ($undelivered_count > 0) {
    echo "Ripristino messaggi non recapitati...<br>";
    $conn->query("UPDATE private_messages SET is_delivered = 1 WHERE is_delivered = 0");
    echo "Messaggi ripristinati: " . $conn->affected_rows . "<br>";
}

// 5. Ottimizza tabella
$conn->query("OPTIMIZE TABLE private_messages");
echo "Ottimizzazione tabella completata.<br>";

$conn->close();
echo "<br>Diagnostica completata. Controlla ora se i messaggi arrivano.";
?>