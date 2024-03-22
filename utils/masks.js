function id( el ){
    return document.getElementById( el );
}

window.onload = function(){
    // Máscara para CEP
    id('cep').setAttribute('maxlength', 9);
    id('cep').onkeypress = function(){
        maskc( this, maskCEP );
    }

    // Máscara para telefone
    id('phone_number').setAttribute('maxlength', 15);
    id('phone_number').onkeypress = function(){
        mask( this, masktel );
    }
}

function maskc(o,f){
    v_obj=o
    v_fun=f
    setTimeout(execmaskcep, 1);
}

function execmaskcep(){
    v_obj.value=v_fun(v_obj.value);
}

function maskCEP(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{5})(\d)/,"$1-$2");
    return v;
}

function mask(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmask()",1)
}

function execmask(){
    v_obj.value=v_fun(v_obj.value)
}

function masktel(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}
