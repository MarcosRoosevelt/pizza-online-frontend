export function verificarAutenticacao() {
    const token = localStorage.getItem("token");
    return !!token; 
}