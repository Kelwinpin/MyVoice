import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function Activity() {
  const [base64, setBase64] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Configurações de compressão
        const options = {
          maxSizeMB: 1, // Tamanho máximo em MB
          maxWidthOrHeight: 800, // Largura ou altura máxima
          useWebWorker: true,
        };

        // Comprime a imagem
        const compressedFile = await imageCompression(file, options);

        // Converte o arquivo comprimido para Base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Erro ao comprimir a imagem:", error);
      }
    }
  };

  const postImage = useMutation({
    mutationFn: () =>
      fetch(`https://api.imgbb.com/1/upload?key=5445f5120d343dc58a3774c3430777aa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64.split(",")[1] // Remove o prefixo "data:image/jpeg;base64,"
        }),
      }).then((res) => res.json()),
    onSuccess: () => {
      console.log("Sucesso");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    postImage.mutate();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Atividade</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {base64 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={base64} alt="Imagem" style={{ maxWidth: "20%" }} />
          <span>
            <a href={base64} download="image.png"></a>
          </span>
        </div>
      )}
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
