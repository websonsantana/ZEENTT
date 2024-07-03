<?php
// Caminho do arquivo CSV onde os dados foram salvos
$arquivo_csv = 'cadastros.csv';

// Verifica se o cliente foi recebido via POST
if (isset($_POST['cliente'])) {
    $cliente = strtolower($_POST['cliente']);

    // Lê o arquivo CSV
    $linhas = file($arquivo_csv, FILE_IGNORE_NEW_LINES);

    $resultados = [];

    // Itera sobre as linhas do arquivo CSV
    foreach ($linhas as $linha) {
        // Separa os campos da linha do CSV
        $campos = explode(',', $linha);

        // Se o cliente encontrado na linha, adiciona aos resultados
        if (strtolower($campos[2]) === $cliente) {
            $resultado = [
                'data' => $campos[0],
                'pedido' => $campos[1],
                'cliente' => $campos[2],
                'valor_bruto' => $campos[3],
                'valor_liquido' => $campos[4],
                'comissao_vendas' => $campos[5],
                'comissao_tecnico' => $campos[6],
                'rt' => $campos[7],
                'campanha' => $campos[8],
                'fabrica' => $campos[9],
                'frete_marel' => $campos[10],
                'frete_biano' => $campos[11],
                'das' => $campos[12],
                'dae' => $campos[13],
                'instalacao' => $campos[14],
                'custos_extras' => $campos[15],
                'saldo_final' => $campos[16],
                'status_venda' => determinarStatusVenda($campos[16]) // Função para determinar o status da venda
            ];

            $resultados[] = $resultado;
        }
    }

    // Retorna os resultados em JSON
    echo json_encode($resultados);
} else {
    http_response_code(400); // Bad Request
}

function determinarStatusVenda($saldo_final) {
    // Implemente sua lógica para determinar o status da venda aqui
    // Exemplo simples: se saldo_final > 0, venda concluída; senão, venda pendente
    if ($saldo_final > 0) {
        return 'Concluída';
    } else {
        return 'Pendente';
    }
}
?>
