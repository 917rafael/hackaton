// import { supabase } from "@/lib/supabaseClient"
// import { defineStore } from "pinia"
// import { ref } from "vue"
// export const useUserStore = defineStore('perfil', () => {
//   const newUser = ref({
//     nome: '',
//     category: '',
//     stock: '',
//     price: '',
//     catalog: '',
//     image_url: '',
//   });
  
//   const carregarFotO = async (event) => {
//     const file = event.target.files[0];
  
  
//     if (!file) {
//       alert('Por favor, selecione um arquivo.');
//       return;
//     }
  
  
//     if (file.size > 2 * 1024 * 1024) { // Limite de 2MB
//       alert('A imagem deve ser menor que 2MB.');
//       return;
//     }
  
  
//     const fileName = `${Date.now()}_${file.name}`; // Nome único para evitar conflitos
  
  
//     // eslint-disable-next-line no-unused-vars
//     const { data, error } = await supabase.storage.from('users-images').upload(fileName, file);
  
  
//     if (error) {
//       console.error('Erro ao fazer upload da imagem:', error.message);
//       alert('Erro ao fazer upload da imagem.');
//       return;
//     }
  
//     // Recuperar URL pública da imagem
//     const { data: publicUrlData } = supabase.storage
//       .from('product-images')
//       .getPublicUrl(fileName);
  
  
//     if (publicUrlData) {
//       newUser.value.image_url = publicUrlData.publicUrl; // Salvar URL pública no produto
//     } else {
//       console.error('Erro ao obter URL pública.');
//       alert('Erro ao obter URL pública da imagem.');
//     }
//   };
  
//   const cliente = ref({
//     nome: '',
//     username: '',
//     email: '',
//     membroDesde: '',
//     foto: 'https://via.placeholder.com/150',
//     atividades: [
//       { data: '12 de Novembro de 2024', descricao: 'Compra de pães artesanais' },
//       { data: '30 de Outubro de 2024', descricao: 'Pedido de torta de maçã' },
//     ],
//   });
  
//   const fileInputRef = ref(null);
//   const mostrarMensagem = ref(null);
//   const mensagemTipo = ref('');
//   const senha = ref('');
//   const confirmaSenha = ref('');
//   const temaEscuro = ref(false);
  
//   const abrirSeletorDeArquivos = () => {
//     fileInputRef.value.click();
//   };
  
  
//   const carregarFoto = (event) => {
//     const arquivo = event.target.files[0];
//     if (arquivo) {
//       const leitor = new FileReader();
//       leitor.onload = () => {
//         cliente.value.foto = leitor.result;
//         mostrarMensagem.value = 'Foto alterada com sucesso!';
//         mensagemTipo.value = 'success';
//       };
//       leitor.readAsDataURL(arquivo);
//     } else {
//       mostrarMensagem.value = 'Erro ao carregar a foto. Tente novamente.';
//       mensagemTipo.value = 'error';
//     }
//   };
  
//   const salvarAlteracoes = () => {
//     if (senha.value !== confirmaSenha.value) {
//       mostrarMensagem.value = 'As senhas não coincidem!';
//       mensagemTipo.value = 'error';
//     } else {
//       cliente.value.nome = cliente.value.nome.trim();
//       cliente.value.email = cliente.value.email.trim();
//       mostrarMensagem.value = 'Alterações salvas com sucesso!';
//       mensagemTipo.value = 'success';
//     }
//   };
  
//   const toggleModoEscuro = () => {
//     temaEscuro.value = !temaEscuro.value;
//   };
  

// return{
//   carregarFoto,
//   abrirSeletorDeArquivos,
//   salvarAlteracoes,
//   toggleModoEscuro,
//   carregarFotO
// }}
// )

export const calculateTotal = (cart) => {
  return cart
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
};
