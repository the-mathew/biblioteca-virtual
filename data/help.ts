// Contenido del centro de ayuda. Mantenerlo alineado con lo que hace la plataforma.
export interface Faq { id: string; q: string; a: string }
export interface HelpCategory { id: string; title: string; icon: string; faqs: Faq[] }

export const helpCategories: HelpCategory[] = [
  {
    id: 'cuenta', title: 'Cuenta y acceso', icon: 'mdi-account-circle-outline',
    faqs: [
      { id: 'c1', q: '¿Necesito una cuenta para explorar la biblioteca?',
        a: 'No. Puedes buscar, ver el detalle de los recursos, recorrer las exposiciones y las colecciones institucionales sin iniciar sesión. Necesitas una cuenta para guardar colecciones, subir contenido y reportar.' },
      { id: 'c2', q: '¿Cómo inicio sesión?',
        a: 'Usa el botón “Ingresa” del encabezado y escribe tu correo y tu contraseña. Tu sesión se mantiene al recargar la página, así que no tendrás que ingresar cada vez.' },
      { id: 'c3', q: '¿Cómo cierro sesión?',
        a: 'Abre el menú con tu nombre, en el encabezado, y elige “Cerrar sesión”.' },
      { id: 'c4', q: 'Olvidé mi contraseña, ¿qué hago?',
        a: 'Estamos trabajando en la recuperación de contraseña. Mientras tanto, escríbenos desde el botón “Contáctanos” al final de esta página y te ayudamos.' }
    ]
  },
  {
    id: 'explorar', title: 'Buscar y explorar', icon: 'mdi-magnify',
    faqs: [
      { id: 'e1', q: '¿Cómo busco un contenido?',
        a: 'Escribe en la caja de búsqueda del encabezado. En la página de resultados puedes filtrar por tema y mostrar solo los contenidos exclusivos de BibloRed. La dirección de la página guarda tu búsqueda, así que puedes compartirla.' },
      { id: 'e2', q: '¿Qué significa “Exclusivo BibloRed”?',
        a: 'Son contenidos de uso exclusivo para las personas usuarias de BibloRed. Se identifican con una etiqueta en la tarjeta y en la ficha del recurso.' },
      { id: 'e3', q: '¿Qué son las exposiciones?',
        a: 'Recorridos temáticos con contenidos comentados y seleccionados por expertos o por la comunidad. Cada exposición muestra quién la creó y los contenidos que incluye.' },
      { id: 'e4', q: '¿Qué son las colecciones institucionales?',
        a: 'Selecciones de contenidos armadas por bibliotecas y entidades aliadas. Puedes guardar una completa como colección tuya.' }
    ]
  },
  {
    id: 'colecciones', title: 'Mis colecciones', icon: 'mdi-bookshelf',
    faqs: [
      { id: 'm1', q: '¿Cómo creo una colección?',
        a: 'Desde el menú con tu nombre, entra a “Mis colecciones” y escribe un nombre. También puedes crearla al vuelo desde la ficha de un recurso, con el botón “Añadir a colecciones”.' },
      { id: 'm2', q: '¿Puedo guardar una colección institucional?',
        a: 'Sí. En la página de la colección usa “Guardar en mis colecciones”. Se copian sus contenidos a una colección tuya con el mismo nombre; si ya la tenías, solo se añaden los que faltan.' },
      { id: 'm3', q: '¿Veré mis colecciones en otro dispositivo?',
        a: 'Por ahora no. Durante la beta tus colecciones se guardan en tu navegador, así que no las verás si ingresas desde otro dispositivo o borras los datos del navegador.' }
    ]
  },
  {
    id: 'subir', title: 'Subir contenido', icon: 'mdi-upload',
    faqs: [
      { id: 's1', q: '¿Quién puede subir contenido?',
        a: 'Cualquier persona con sesión iniciada. Entra por “Subir contenido” en el menú con tu nombre.' },
      { id: 's2', q: '¿Qué formatos y tamaños se aceptan?',
        a: 'Para la obra: PDF, EPUB, MP3, M4A o MP4, de hasta 100 MB. La portada es opcional: una imagen de hasta 5 MB.' },
      { id: 's3', q: '¿Mi contenido se revisa antes de publicarse?',
        a: 'Durante la beta se publica de inmediato. Otras personas pueden reportarlo si no cumple las normas, y un contenido reportado puede ocultarse o retirarse.' },
      { id: 's4', q: '¿Qué licencia debo elegir?',
        a: 'La licencia define qué pueden hacer otras personas con tu obra. Cada opción de Creative Commons permite usos distintos; puedes ver el detalle de cada una en creativecommons.org. Al subir declaras que eres el autor o que tienes los derechos para compartirla.' },
      { id: 's5', q: '¿Puedo eliminar algo que subí?',
        a: 'Sí. En “Mis aportes” cada obra tiene un botón “Eliminar”.' }
    ]
  },
  {
    id: 'reportes', title: 'Reportes y derechos de autor', icon: 'mdi-flag-outline',
    faqs: [
      { id: 'r1', q: '¿Cómo reporto un contenido?',
        a: 'En la ficha del recurso, usa “Reportar este contenido”, elige el motivo y, si quieres, añade detalles. Necesitas haber iniciado sesión.' },
      { id: 'r2', q: '¿Qué pasa después de reportar?',
        a: 'El reporte queda registrado para su revisión. Un contenido con varios reportes puede ocultarse mientras se revisa.' },
      { id: 'r3', q: 'Creo que usaron mi obra sin mi permiso, ¿qué hago?',
        a: 'Reporta el contenido eligiendo “Infringe derechos de autor” y explica en los detalles por qué la obra es tuya. También puedes escribirnos desde “Contáctanos”.' }
    ]
  }
]
