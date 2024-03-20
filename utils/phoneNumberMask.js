function idcss( el ){
    return document.getElementById( el );
}

window.onload = function(){
    idcss('phone_number').setAttribute('maxlength', 15);
    idcss('phone_number').onkeypress = function(){
        mask( this, masktel );
    }
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