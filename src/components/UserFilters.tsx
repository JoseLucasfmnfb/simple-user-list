"use client";

type FiltroDisponivel = "disponivel" | "indisponivel" | "todos";
type OrderBy = "" | "nome" | "status";
type OrderDirection = "" | "asc" | "desc";

type UserFiltersProps = {
    filtroDisponivel: FiltroDisponivel;
    setFiltroDisponivel: (value: FiltroDisponivel) => void;
    orderBy: OrderBy;
    setOrderBy: (value: OrderBy) => void;
    orderDirection: OrderDirection;
    setOrderDirection: (value: OrderDirection) => void;
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
                    className={`btn-base btn-success px-3 py-2 rounded ${filtroDisponivel === 'disponivel' ? "selected" : ""}`}
                >
                    Disponíveis
                </button>
                <button
                    onClick={() => setFiltroDisponivel('indisponivel')}
                    className={`btn-base btn-error px-3 py-2 rounded ${filtroDisponivel === 'indisponivel' ? "selected" : ""}`}
                >
                    Indisponíveis
                </button>
                <button
                    onClick={() => setFiltroDisponivel('todos')}
                    className={`btn-base px-3 py-2 rounded bg-blue-500 ${filtroDisponivel === 'todos' ? "selected" : ""}`}
                >
                    Todos
                </button>
            </div>

            {/* Ordenação */}
            <div className="flex gap-2 items-center">
                <span>Ordenar por Atributo:</span>
                <div className="select-wrapper">
                    <select
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value as "nome" | "status")}
                        className="select-base border px-3 py-2 rounded"
                    >
                        <option value="">Selecione o atributo</option>
                        <option value="nome">Nome</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                <span>Ordem:</span>
                <div className="select-wrapper">

                    <select
                        value={orderDirection}
                        onChange={(e) => setOrderDirection(e.target.value as "asc" | "desc")}
                        className="select-base border px-3 py-2 rounded"
                    >
                        <option value="">Selecione a ordem</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>

            {/* Limpar preferências */}
            <button
                onClick={onClear}
                className="btn-base px-3 py-2 rounded"
            >
                Limpar Preferências
            </button>
        </div>
    );
}
