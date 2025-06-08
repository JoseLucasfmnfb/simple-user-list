"use client";

type FiltroDisponivel = "disponivel" | "indisponivel" | "todos";

type UserFiltersProps = {
    filtroDisponivel: FiltroDisponivel;
    setFiltroDisponivel: (value: FiltroDisponivel) => void;
    orderBy: "nome" | "status";
    setOrderBy: (value: "nome" | "status") => void;
    orderDirection: "asc" | "desc";
    setOrderDirection: (value: "asc" | "desc") => void;
    onClear: () => void;
};

export default function UserFilters({
    filtroDisponivel,
    setFiltroDisponivel,
    orderBy,
    setOrderBy,
    orderDirection,
    setOrderDirection,
    onClear,
}: UserFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-end">
            {/* Filtro por disponibilidade */}
            <div className="flex gap-2 items-center">
                <span>Status:</span>
                <button
                    onClick={() => setFiltroDisponivel('disponivel')}
                    className={`btn-base btn-success px-2 py-1 rounded ${filtroDisponivel === 'disponivel' ? "opacity-75" : ""}`}
                >
                    Disponíveis
                </button>
                <button
                    onClick={() => setFiltroDisponivel('indisponivel')}
                    className={`btn-base btn-error px-2 py-1 rounded ${filtroDisponivel === 'indisponivel' ? "opacity-75" : ""}`}
                >
                    Indisponíveis
                </button>
                <button
                    onClick={() => setFiltroDisponivel('todos')}
                    className={`btn-base px-2 py-1 rounded bg-blue-500 ${filtroDisponivel === 'todos' ? "opacity-75" : ""}`}
                >
                    Todos
                </button>
            </div>

            {/* Ordenação */}
            <div className="flex gap-2 items-center">
                <span>Ordenar por:</span>
                <div className="select-wrapper">
                    <select
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value as "nome" | "status")}
                        className="select-base border px-2 py-1 rounded"
                    >
                        <option value="nome">Nome</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                <div className="select-wrapper">

                    <select
                        value={orderDirection}
                        onChange={(e) => setOrderDirection(e.target.value as "asc" | "desc")}
                        className="select-base border px-2 py-1 rounded"
                    >
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>

            {/* Limpar preferências */}
            <button
                onClick={onClear}
                className="btn-base bg-gray-500 text-white px-3 py-1 rounded"
            >
                Limpar Preferências
            </button>
        </div>
    );
}
