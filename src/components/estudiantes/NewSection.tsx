export const NewSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 text-sm font-medium mb-4 rounded-full">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          Novedades
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¡Conoce las últimas actualizaciones!</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre las nuevas funcionalidades que hemos desarrollado para mejorar tu experiencia académica
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Main Feature Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-700 text-white rounded-lg shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20" />
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 text-white border border-white/30 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Nuevo
            </div>
          </div>
          <div className="relative p-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Cima Sync</h3>
              <p className="text-emerald-100 text-lg mb-6">
                La nueva aplicación que revoluciona tu acceso a los servicios universitarios
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/90">
                  <strong>Inicia sesión solo una vez</strong> y accede a todos los servicios sin preocuparte por
                  recordar múltiples contraseñas
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/90">
                  <strong>Sincronización automática</strong> entre todos tus dispositivos y plataformas universitarias
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/90">
                  <strong>Seguridad avanzada</strong> con autenticación biométrica y encriptación de extremo a extremo
                </p>
              </div>
            </div>

            <button className="w-full bg-white text-emerald-700 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
              Descargar Cima Sync
              <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12,5 19,12 12,19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Additional Features */}
        <div className="space-y-6">
          <div className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Acceso Instantáneo</h4>
                <p className="text-gray-600 text-sm">
                  Conecta automáticamente con UABC Next, Sistema de Bibliotecas, Plataforma Educativa y más servicios
                  universitarios.
                </p>
              </div>
            </div>
          </div>

          <div className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Máxima Seguridad</h4>
                <p className="text-gray-600 text-sm">
                  Protección avanzada de tus datos académicos con tecnología de autenticación de última generación.
                </p>
              </div>
            </div>
          </div>

          <div className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">De código abierto</h4>
                <p className="text-gray-600 text-sm">
                  Todos pueden ver y modificar el código de esta para una transparencia total.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
