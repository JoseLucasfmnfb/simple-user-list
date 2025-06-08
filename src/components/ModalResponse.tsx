type ModalProps = {
    type: "success" | "error";
    message: string;
    onClose: () => void;
};

export default function ModalResponse({ type, message, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className={`p-4 rounded shadow-lg max-w-sm w-full 
        ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                <h2 className="font-bold text-lg mb-2">{type === "success" ? "Sucesso" : "Erro"}</h2>
                <p>{message}</p>
                <button onClick={onClose} className="mt-4 bg-white px-3 py-1 rounded border">
                    Fechar
                </button>
            </div>
        </div>
    );
}