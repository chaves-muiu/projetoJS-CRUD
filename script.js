
        var precoUni = $("#precoUni").val()
        if(precoUni != "" && precoUni != null){
            $("#valorTotal").val(parseFloat(qtdProduto)*parseFloat(precoUni))
        }
    }else{
        throw "valores nos campos sao invalidos"
    }
}*/

function listar(){
    $("#listaProdutos").html("");
    if(localStorage.getItem("produtos") == null){
        
        return
    }

    dados = JSON.parse(localStorage.getItem("produtos"))
    for(var i = 0; i < dados.length; i++ ){
        var linha = "<tr onclick='editar("+ i + ")'>";

        linha += "<td>" + dados[i].nome + "</td>";
        linha += "<td>" + dados[i].qtd + "</td>";
        linha += "<td>" + dados[i].preco + "</td>";
        
        linha += "<td>" + new Intl.NumberFormat(
            'pt-br', {style: 'currency', currency: 'BRL'}    
        ).format(dados[i].totaljson) + "</td>";
        
        linha += '<td><button class="btn btn-danger" onclick="remover('+ i +')">Remover</button></td>';
        linha += "</tr>";

        
        $("#listaProdutos").append(linha)
    }

        totalGeral();
    

}

indiceEdicao = -1

function editar(i){

    indiceEdicao = i

    var nomeProduto = $("#nomeProduto")
    var qtdProduto = $("#qtdProduto")
    var precoUni = $("#precoUni")
    var dados = JSON.parse(localStorage.getItem("produtos"))

    nomeProduto.val(dados[i].nome)
    qtdProduto.val(dados[i].qtd)
    precoUni.val(dados[i].preco)


}

function verificaUrgencia(){
    var urgencia = $("#urgencia").val()
    var dataL = $("#divDataLimite")

    if(urgencia == "Alta"){
            dataL.show()
    }else{
        dataL.hide()
    }
        
}

function validar(){
    var nomeProduto = $("#nomeProduto")
    var qtdProduto = $("#qtdProduto").val().replace(",",".").replace(/[^0-9.]/g, "")
    var precoUni = $("#precoUni").val().replace(",",".").replace(/[^0-9.]/g, "")
    var total = parseFloat(qtdProduto)*parseFloat(precoUni)
    
    if( localStorage.getItem("produtos")!= null ){
        dados = JSON.parse(localStorage.getItem("produtos"))
    }else{
        var dados = []
    }

    if(nomeProduto.val() == ""){
        nomeProduto.parent().addClass("has-error")
        return
    }
    nomeProduto.parent().removeClass("has-error")
    
    if(qtdProduto < 0 || qtdProduto == ""){
        $("#qtdProduto").parent().addClass("has-error")
        return
    }
    $("#qtdProduto").parent().removeClass("has-error")

    if(precoUni < 0 || precoUni == ""){
        $("#precoUni").parent().addClass("has-error")
        return
    }
    $("#precoUni").parent().removeClass("has-error")
        

    var produto = {
        nome: nomeProduto.val(),
        qtd: qtdProduto,
        preco: precoUni,
        totaljson: total
        
    };

    if(indiceEdicao != -1){
        return
    }
    dados.push(produto)
    
    var dadosSalvar = JSON.stringify(dados)
    localStorage.setItem("produtos", dadosSalvar)

    $("#nomeProduto").val("")
    $("#qtdProduto").val("")
    $("#precoUni").val("")
    
    listar();
    
}
function remover(i){        
    var lista = JSON.parse(localStorage.getItem("produtos"))
    lista.splice(i,1)

    localStorage.setItem("produtos", JSON.stringify(lista))
    
    listar();
    totalGeral();
}

function totalGeral(){
    let soma = 0 
    $("#listaProdutos tr").each(function(){
        soma += parseFloat($(this).find("td").eq(3).text())
                
    })
        $("#valorTotal").val(
        new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(soma)
    ) 
}

$("#qtdProduto, #precoUni").on("input", function(){
    var valorDigitado = $(this).val();

    var valorLimpo = valorDigitado.replace(/[^0-9,.]/g, "");

    $(this).val(valorLimpo);
})

listar();

