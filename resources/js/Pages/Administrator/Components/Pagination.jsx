"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange,
                        itemsPerPage,
                        totalItems,
                        showItemsPerPage = true,
                        onItemsPerPageChange = null,
                        className = "",
                    }) => {

    // Función para generar el rango de páginas a mostrar
    const getPageRange = () => {
        const delta = 1 // Número de páginas a mostrar a cada lado de la página actual
        const range = []

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i)
        }

        // Añadir puntos suspensivos o páginas adicionales
        if (currentPage - delta > 2) {
            range.unshift("...")
        }
        if (currentPage + delta < totalPages - 1) {
            range.push("...")
        }

        // Siempre mostrar la primera y última página
        if (totalPages > 1) {
            range.unshift(1)
            if (totalPages > 1) {
                range.push(totalPages)
            }
        }

        return range
    }

    const pageRange = getPageRange()

    // Opciones para el selector de elementos por página
    const itemsPerPageOptions = [10, 25, 50, 100]

    return (
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 py-4 ${className}`}>
            {/* Información sobre los resultados */}
            <div className="text-sm text-gray-600">
                Mostrant {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} a{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} resultats
            </div>

            <div className="flex items-center gap-2">
                {/* Selector de elementos por página */}
                {showItemsPerPage && onItemsPerPageChange && (
                    <div className="flex items-center gap-2 mr-4">
                        <span className="text-sm text-gray-600">Mostrar:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="text-sm border border-gray-300 rounded-md px-4 py-1 bg-white"
                        >
                            {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Botón Anterior */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-9 h-9 rounded-md border ${
                        currentPage === 1
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label="Pàgina anterior"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Números de página */}
                {pageRange.map((page, index) =>
                        page === "..." ? (
                            <span key={`ellipsis-${index}`} className="flex items-center justify-center w-9 h-9">
              <MoreHorizontal size={16} className="text-gray-400" />
            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`flex items-center justify-center w-9 h-9 rounded-md border ${
                                    currentPage === page
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                }`}
                                aria-label={`Pàgina ${page}`}
                                aria-current={currentPage === page ? "page" : undefined}
                            >
                                {page}
                            </button>
                        ),
                )}

                {/* Botón Siguiente */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-9 h-9 rounded-md border ${
                        currentPage === totalPages
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label="Pàgina següent"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}

export default Pagination
