import { useState } from "react";
import { Search, Pencil, Trash, Plus, Menu } from "lucide-react";

const users = Array(8).fill("User");

export default function UserList() {
    const [search, setSearch] = useState("");

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
            {/* Header */}
            <div className="w-full max-w-sm bg-black text-white p-4 rounded-xl">
                <h1 className="text-2xl font-bold">VISTA EMPRESA</h1>
                <p className="text-gray-400 text-sm">Llistat de treballadors/Mobil</p>
            </div>

            {/* Barra de cerca */}
            <div className="w-full max-w-sm mt-4 p-4 bg-white rounded-lg shadow-md flex items-center space-x-2 border">
                <Menu className="text-gray-600" />
                <input
                    type="text"
                    placeholder="Search Users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border-none focus:ring-0"
                />
                <Search className="text-gray-600" />
            </div>

            {/* Llista d'usuaris */}
            <div className="w-full max-w-sm mt-4">
                {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-2 mt-2 bg-white rounded-lg shadow-sm border">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-full">
                                A
                            </div>
                            <p>{user}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button>
                                <Pencil className="text-gray-600" />
                            </button>
                            <button>
                                <Trash className="text-red-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botó afegir usuari */}
            <button className="mt-4 flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
                <Plus /> <span>Add user</span>
            </button>
        </div>
    );
}
