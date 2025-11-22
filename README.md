# 🏗️ AI 3D Voxel Architect

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-R3F-black) ![Gemini AI](https://img.shields.io/badge/AI-Gemini%20Pro-8E75B2)

Una aplicación web interactiva de modelado 3D que combina la creatividad de los bloques estilo LEGO con la potencia de la Inteligencia Artificial Generativa de Google Gemini.

Construye estructuras libremente o pídele a la IA que genere planos arquitectónicos complejos, vehículos o criaturas en segundos.

## ✨ Características

- **Generación AI Avanzada**: Utiliza **Gemini 3 Pro Preview** con "Thinking Budget" activado para razonar espacialmente y crear estructuras complejas (100-500 bloques).
- **Motor 3D Reactivo**: Renderizado fluido con **Three.js** y **React Three Fiber**.
- **Herramientas de Edición**: Modos de Construir, Pintar y Borrar con detección de caras inteligente.
- **Retos Creativos**: Generador de ideas impulsado por **Gemini 2.5 Flash** para cuando te falta inspiración.
- **Interfaz Moderna**: UI flotante con Glassmorphism (Tailwind CSS).

## 🛠️ Stack Tecnológico

Este proyecto demuestra una integración profesional de tecnologías de frontend moderno e IA:

### Core
- **React 18**: Arquitectura basada en componentes.
- **TypeScript**: Tipado estático estricto para lógica 3D y datos.

### Gráficos 3D
- **Three.js**: Librería base de WebGL.
- **React Three Fiber (R3F)**: Reconciliador declarativo para la escena.
- **React Three Drei**: Abstracciones para controles de cámara (`OrbitControls`), entorno (`Environment`, `Sky`) y sombras (`ContactShadows`).

### Inteligencia Artificial
- **Google Gemini API**:
  - `gemini-3-pro-preview`: Para la generación de blueprints complejos con razonamiento espacial.
  - `gemini-2.5-flash`: Para generación de texto rápida (retos).

### Estilos
- **Tailwind CSS**: Diseño responsivo y utilitario.
- **Lucide React**: Iconografía.

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/ai-voxel-architect.git
   cd ai-voxel-architect
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar API Key**
   Configura tu variable de entorno `API_KEY` con tu clave de Google Gemini.

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🎮 Controles

- **Click Izquierdo**: Rotar cámara.
- **Click Derecho**: Desplazar cámara (Pan).
- **Rueda**: Zoom.
- **Click en Grid/Bloque**: Construir (en modo Construcción).
- **Click en Bloque**: Pintar o Borrar (según la herramienta seleccionada).

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
