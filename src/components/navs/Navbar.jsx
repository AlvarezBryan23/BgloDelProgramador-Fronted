import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Navbar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const [openSections, setOpenSections] = useState({
    articulos: false,
    recursos: false,
    contacto: false,
  });

  // Función para alternar la sección del acordeón
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Estilos generales para list items
  const listItemStyle = {
    cursor: "pointer",
    marginBottom: "1rem",
    textAlign: "left",
    padding: "12px 16px",
    backgroundColor: "#2c2f38",
    borderRadius: "6px",
    color: "#ffffff",
    userSelect: "none",
    transition: "background-color 0.3s ease",
  };

  // Estilo para lista con hover
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#3a3f51";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#2c2f38";
  };

  return (
    <>
      <button
        className="sidebar-button"
        style={{
          backgroundColor: "#61dafb",
          border: "none",
          color: "#121212",
          padding: "10px 12px",
          borderRadius: "5px",
          fontSize: "20px",
          cursor: "pointer",
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1050,
          marginTop: "75px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#52c7ea")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#61dafb")}
      >
        <FaBars />
      </button>

      <div
        className={`sidebar-container ${collapsed ? "hidden" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1040,
          marginTop: "75px",
          width: "280px",
          backgroundColor: "rgba(30,30,47,0.95)",
          boxShadow: "2px 0 12px rgba(0,0,0,0.8)",
          color: "#ffffff",
          padding: "1rem 1.5rem",
          height: "calc(100vh - 75px)",
          overflowY: "auto",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid #444",
          transition: "transform 0.3s ease",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#61dafb",
            fontWeight: "bold",
            userSelect: "none",
            textShadow: "0 0 8px #61dafb",
          }}
        >
          Blog del Programador
        </h1>

        <div style={{ marginBottom: "1.5rem" }}>
          <div
            onClick={() => toggleSection("usuarios")}
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              cursor: "pointer",
              padding: "12px 10px",
              userSelect: "none",
              backgroundColor: openSections.usuarios ? "#292d3e" : "transparent",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#bb86fc",
              boxShadow: openSections.usuarios ? "inset 0 0 10px #bb86fc" : "none",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              borderBottom: "1px solid #444",
            }}
            aria-expanded={openSections.usuarios}
          >
            <span>👤 Usuarios</span>
            <span
              style={{
                fontSize: "1.2rem",
                transform: openSections.usuarios? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.3s ease",
              }}
            >
              ▼
            </span>
          </div>
          {openSections.usuarios && (
            <div style={{ marginTop: "0.75rem", paddingLeft: "15px" }}>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/edit");
                  setCollapsed(true);
                }}
              >
                ✏️ Editar Usuario
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/editFoto");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                🖼️ Actualizar Foto
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/editPassword")
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                🔒 Actualizar Contraseña
              </div>
            </div>
          )}
        </div>

        {/* Recursos */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            onClick={() => toggleSection("recursos")}
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              cursor: "pointer",
              padding: "12px 10px",
              userSelect: "none",
              backgroundColor: openSections.recursos ? "#292d3e" : "transparent",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#bb86fc",
              boxShadow: openSections.recursos ? "inset 0 0 10px #bb86fc" : "none",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              borderBottom: "1px solid #444",
            }}
            aria-expanded={openSections.recursos}
          >
            <span>📰 Publicaciones</span>
            <span
              style={{
                fontSize: "1.2rem",
                transform: openSections.recursos ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.3s ease",
              }}
            >
              ▼
            </span>
          </div>
          {openSections.recursos && (
            <div style={{ marginTop: "0.75rem", paddingLeft: "15px" }}>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/agregarPublicacion");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                📝 Crear Publicacion
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/editarPublicacion");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                🛠️ Editar Publicacion
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/eliminarPublicacion");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                🗑️ Eliminar Publicacion
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/listarCategoria");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                📑 Listar Por Categoria
              </div>
            </div>
          )}
        </div>

        {/* Contacto */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            onClick={() => toggleSection("contacto")}
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              cursor: "pointer",
              padding: "12px 10px",
              userSelect: "none",
              backgroundColor: openSections.contacto ? "#292d3e" : "transparent",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#bb86fc",
              boxShadow: openSections.contacto ? "inset 0 0 10px #bb86fc" : "none",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              borderBottom: "1px solid #444",
            }}
            aria-expanded={openSections.contacto}
          >
            <span>💬 Comentarios</span>
            <span
              style={{
                fontSize: "1.2rem",
                transform: openSections.contacto ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.3s ease",
              }}
            >
              ▼
            </span>
          </div>
          {openSections.contacto && (
            <div style={{ marginTop: "0.75rem", paddingLeft: "15px" }}>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/addComentario");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                ➕ Agregar Comentario
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/editComentario");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                ✏️ Editar Comentario
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/deleteComentario");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                ❌ Eliminar Comentario
              </div>
              <div
                style={listItemStyle}
                onClick={() => {
                  navigate("/listarComentario");
                  setCollapsed(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                📃 Listar Comentario
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fondo general y estilos para dispositivo móvil */}
      <style>{`
        body, html, #root {
          margin: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: url('https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed;
          background-size: cover;
          overflow-x: hidden;
          color: #e0e0e0;
        }
        .hidden {
          transform: translateX(-100%);
        }
        @media (max-width: 768px) {
          .sidebar-button {
            display: block !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
        }
        @media (min-width: 769px) {
          .sidebar-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
