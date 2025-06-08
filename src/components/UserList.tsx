type Props = {
    usuarios: { Nome: string; Disponivel: boolean }[];
};

export default function UserList({ usuarios }: Props) {
    return (
        <ul className="space-y-2">
            {usuarios.map((usuario) => (
                <li
                    key={usuario.Nome}
                    className={`p-2 rounded border ${usuario.Disponivel ? "border-green-500" : "border-red-500"}`}
                >
                    {usuario.Nome} —{" "}
                    <span className={usuario.Disponivel ? "text-green-600" : "text-red-600"}>
                        {usuario.Disponivel ? "Disponível" : "Indisponível"}
                    </span>
                </li>
            ))}
        </ul>
    );
}