"use client";
import { useEffect, useState } from "react";
import UserList from "@/components/UserList";
import ModalResponse from '@/components/ModalResponse'
import UserFilters from "@/components/UserFilters";

type Usuario = {
	Nome: string;
	Disponivel: boolean;
};

type FiltroDisponivel = "disponivel" | "indisponivel" | "todos";
type OrderBy = "nome" | "status" | "";
type OrderDirection = "asc" | "desc" | "";

export default function Home() {
	const [usuarios, setUsuarios] = useState<Usuario[]>([]);
	const [erro, setErro] = useState("");
	const [localizacao, setLocalizacao] = useState<string | null>(null);
	const [filtroDisponivel, setFiltroDisponivel] = useState<FiltroDisponivel>('todos');
	const [orderBy, setOrderBy] = useState<OrderBy>("");
	const [orderDirection, setOrderDirection] = useState<OrderDirection>("");

	// Carrega filtro do localStorage
	useEffect(() => {
		const storedStatus = localStorage.getItem("filtroDisponivel") as FiltroDisponivel | null;
		const storedOrder = localStorage.getItem("orderBy") as OrderBy | null;
		const storedDirrection = localStorage.getItem("orderDirection") as OrderDirection | null;
		if (storedStatus) {
			setFiltroDisponivel(storedStatus);
		}
		if (storedOrder) {
			setOrderBy(storedOrder)
		}
		if (storedDirrection) {
			setOrderDirection(storedDirrection)
		}
	}, []);

	// Salva no localStorage quando filtro mudar
	useEffect(() => {
		localStorage.setItem("filtroDisponivel", filtroDisponivel);
	}, [filtroDisponivel]);

	useEffect(() => {
		localStorage.setItem("orderBy", orderBy);
	}, [orderBy]);

	useEffect(() => {
		localStorage.setItem("orderDirection", orderDirection);
	}, [orderDirection]);

	useEffect(() => {
		// Chamada da API
		fetch("https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/")
			.then((res) => res.json())
			.then((data) => {
				if (data.Msg !== "Sucesso ao Encontrar usuário.") {
					setErro("Erro ao buscar usuários.");
				} else {
					setUsuarios(data.Dados);
				}
			})
			.catch(() => setErro("Erro na requisição."));

		// Geolocalização
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				try {
					const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
					const data = await res.json();
					setLocalizacao(`${data.address.city || data.address.town}, ${data.address.country}`);
				} catch (err) {
					console.log(err)
					setLocalizacao("Localização indisponível.");
				}
			});
		} else {
			setLocalizacao("Geolocalização não suportada.");
		}
	}, []);

	const usuariosFiltrados = usuarios
		.filter((usuario) => {
			if (filtroDisponivel === "todos") return true;
			if (filtroDisponivel === "disponivel") return usuario.Disponivel;
			if (filtroDisponivel === "indisponivel") return !usuario.Disponivel;
			return true;
		})
		.sort((usuarioA, usuarioB) => {
			if (orderBy === "nome") {
				const comp = usuarioA.Nome.localeCompare(usuarioB.Nome);
				return orderDirection === "asc" ? comp : -comp;
			} else {
				const comp = (usuarioA.Disponivel === usuarioB.Disponivel) ? 0 : usuarioA.Disponivel ? -1 : 1;
				return orderDirection === "asc" ? comp : -comp;
			}
		});

	const limparPreferencias = () => {
		setFiltroDisponivel("todos");
		localStorage.removeItem("filtroDisponivel");
		localStorage.removeItem("orderBy");
		localStorage.removeItem("orderDirection");
		setOrderBy("");
		setOrderDirection("");
	};

	return (
		<main className="p-8 font-sans">
			<h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
			{localizacao && (
				<p className="mb-4 text-sm text-white-600">Sua localização: {localizacao}</p>
			)}
			<UserFilters
				filtroDisponivel={filtroDisponivel}
				setFiltroDisponivel={setFiltroDisponivel}
				orderBy={orderBy}
				setOrderBy={setOrderBy}
				orderDirection={orderDirection}
				setOrderDirection={setOrderDirection}
				onClear={limparPreferencias}
			/>
			{usuariosFiltrados && (
				<UserList usuarios={usuariosFiltrados} />
			)}
			{erro && (
				<ModalResponse type="error" message={erro} onClose={() => setErro('')} />
			)}
		</main>
	);
}