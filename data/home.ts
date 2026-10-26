// Datos mock. Cuando exista API, reemplazar por composables (useFetch).
export const heroSlides = [
  {
    kicker: 'HAZLO TÚ MISMO', title: 'Solo una mordidita chiquita',
    text: 'Imagina que el olor a pan recién horneado inunda tu casa y, de pronto, un mariachi de huesos quiere intercambiar canciones por una mordida. Descubre cómo se vive esta celebración mexicana.',
    cta: 'Aprende aquí', to: '/recursos/1', bg: 'linear-gradient(120deg,#16223f,#5a2a6b)'
  },
  {
    kicker: 'RECOMENDADOS DE NUESTROS ALIADOS', title: 'Fanzinerología - Instituto Bogotano de Corte',
    text: '¿Y si hacer un fanzine fuera como preparar un brebaje? Esta guía te muestra sus orígenes y tipos, además de los materiales para que tu propia publicación tome forma.',
    cta: 'Explora aquí', to: '/recursos/2', bg: 'linear-gradient(120deg,#16223f,#1f6b5a)'
  },
  {
    kicker: 'RECOMENDADO DEL MES', title: 'Kirigami',
    text: '¿Te gustaría crear una máscara o una criatura con tus manos? El kirigami, un antiguo arte japonés que corta y pliega papel, te da los trucos paso a paso.',
    cta: 'Lee aquí', to: '/recursos/3', bg: 'linear-gradient(120deg,#16223f,#a3352a)'
  },
  {
    kicker: 'CONTENIDO LOCAL', title: 'El niño',
    text: 'Este cómic reúne historias creadas por jóvenes de la Biblioteca Pública Carlos E. Restrepo, quienes conocen de cerca los relatos terroríficos de sus barrios.',
    cta: 'Observa aquí', to: '/recursos/4', bg: 'linear-gradient(120deg,#16223f,#2d3a6b)'
  },
]

export const collections = [
  {
    id: 1, title: 'Libros de cuentos para colgarse del techo - Federico Baraya',
    text: 'Algunas joyas del terror andino contemporáneo y un poco más antiguo.', color: '#3b2f4a'
  },
  {
    id: 2, title: 'Horóscopo literario de Isabel Allende',
    text: 'El horóscopo literario para conocer el universo de la escritora chilena Isabel Allende.', color: '#6b3f8a'
  },
  {
    id: 3, title: 'Mujeres indígenas',
    text: 'Cuando hablamos de mujeres indígenas, ¿qué historias encontramos en una biblioteca?', color: '#2f6b4f'
  },
  {
    id: 4, title: 'Rabiaaaa',
    text: 'Lo importante no es dejar de sentir rabia, sino saber qué hacer con ella.', color: '#8a2f2f'
  }
]

export const expositions = [
  {
    slug: 'bogofonias-otras-musicas-de-bogota', category: 'Música',
    title: 'Bogofonías. Otras músicas de Bogotá',
    text: 'Ocho agrupaciones que existen al margen del gusto masificado y sugieren otra Bogotá musical.',
    creator: 'Ana Maria Amaya Villarreal Amaya', color: '#1d1d1d'
  },
  {
    slug: 'la-gran-fiesta', category: 'Memoria colectiva',
    title: 'La gran fiesta: memorias vivas de Kennedy',
    text: 'Fiestas, festivales, carnavales e iniciativas culturales de la localidad octava de Bogotá.',
    creator: 'Biblioteca Digital De Bogotá', color: '#a3352a'
  },
  {
    slug: 'entretejidos', category: 'Historia',
    title: 'Entretejidxs. Memorias de los oficios en San Cristóbal',
    text: 'La memoria del trabajo, los oficios y el rebusque desde las voces de los habitantes de San Cristóbal.',
    creator: 'Biblioteca Digital De Bogotá', color: '#2f5d8a'
  }
]

export const mostViewed = [
  {
    id: 3648631, title: 'Hábitos atómicos', author: 'James Clear', year: 2020, exclusive: true,
    text: 'El cambio real proviene del resultado de cientos de pequeñas decisiones: hacer dos flexiones al día, levantarse cinco minutos antes...',
    topics: ['Otros'], color: '#c9a227'
  },
  {
    id: 3405160, title: 'El cuento de la criada', author: 'Margaret Atwood', year: 2017, exclusive: true,
    text: 'En la República de Gilead, el cuerpo de Defred sólo sirve para procrear, tal como imponen las férreas normas de la dictadura puritana.',
    topics: ['Autores canadienses', 'Literatura canadiense'], color: '#8a2f2f'
  },
  {
    id: 3697424, title: 'Mi código de honor', author: 'Rolando Martínez', year: 2024, exclusive: true,
    text: 'Contiene 50 máximas para el éxito y el crecimiento personal, un conjunto de principios útiles para mejorar y alcanzar metas.',
    topics: ['Autores mexicanos', 'Literatura mexicana', 'Otros'], color: '#2f5d8a'
  },
  {
    id: 2925941, title: 'El pájaro de los mil cantos', author: 'Lizardo Carvajal', year: 2015, exclusive: false,
    text: 'Una historia tras el rastro de un misterioso pájaro capaz de imitar a todas las otras aves. Premio Crea Digital 2014.',
    topics: ['Ciencias naturales', 'Otros'], color: '#2f6b4f'
  },
  {
    id: 3416504, title: 'Nuestra parte de noche', author: 'Mariana Enriquez', year: 2019, exclusive: true,
    text: 'Un padre y un hijo atraviesan Argentina por carretera durante los años de la junta militar. Una novela libre y osada.',
    topics: ['Autores argentinos', 'Literatura argentina'], color: '#3b2f4a'
  },
  {
    id: 2925945, title: 'El sol, la luna y el agua. Un cuento nigeriano', author: 'Laura Herrera', year: 2015, exclusive: false,
    text: 'Hermosa historia basada en la tradición oral de Nigeria, con animaciones y música.',
    topics: ['Literatura colombiana', 'Autores colombianos'], color: '#da532c'
  }
]

export const allies = [
  { name: 'Retina Latina', id: 374 },
  { name: 'Biblioteca Nacional de Colombia', id: 1 },
  { name: 'Agrosavia', id: 358 },
  { name: 'Biblioteca Virtual Banco de la República', id: 5 },
  { name: 'Artesanías de Colombia', id: 309 },
  { name: 'Señal Memoria', id: 311 },
  { name: 'Icanh - Fondo editorial', id: 361 }
]

export const footerColumns = [
  {
    title: 'Servicio al ciudadano', links: [
      ['Centro de ayuda', '/centro-de-ayuda'],
      ['IDECA', 'https://www.ideca.gov.co/'],
      ['Plan anticorrupción', 'https://ant.culturarecreacionydeporte.gov.co/es/scrd-transparente/plan-anticorrupcion-y-de-atencion-al-ciudadano-historico'],
      ['Denuncie actos de corrupción', 'https://bogota.gov.co/sdqs/crear-peticion'],
      ['Punto de atención al ciudadano', 'https://ant.culturarecreacionydeporte.gov.co/es/atencion-y-servicios-la-ciudadania'],
      ['Sistema Distrital de quejas y solicitudes', 'https://bogota.gov.co/sdqs/'],
      ['Política de tratamiento de datos', 'https://www.culturarecreacionydeporte.gov.co/es/politicas-de-privacidad-y-tratamiento-de-datos-personales'],
      ['Términos y condiciones', 'https://coleccionesdigitales.biblored.gov.co/wiki/index.php/Pol%C3%ADticas_de_la_Biblioteca_Digital_de_Bogot%C3%A1']
    ]
  },
  {
    title: 'Red de páginas del sector', links: [
      ['Secretaría de Cultura, Recreación y Deporte', 'https://www.culturarecreacionydeporte.gov.co/es'],
      ['IDRD', 'https://idrd.gov.co/'],
      ['IDARTES', 'https://www.idartes.gov.co/es'],
      ['Orquesta Filarmónica de Bogotá', 'https://filarmonicabogota.gov.co/'],
      ['IDPC', 'https://idpc.gov.co/'],
      ['FUGA', 'https://www.fuga.gov.co/'],
      ['Canal Capital', 'https://www.canalcapital.gov.co/']
    ]
  },
  {
    title: 'Entidades de control', links: [
      ['Personería Distrital', 'http://www.personeriabogota.gov.co/'],
      ['Contraloría General de la Nación', 'https://www.contraloria.gov.co/'],
      ['Concejo de Bogotá D.C.', 'https://concejodebogota.gov.co/'],
      ['Veeduría Distrital', 'https://www.veeduriadistrital.gov.co/'],
      ['Contratación a la Vista', 'https://bogota.gov.co/asi-vamos/contratos-y-obras'],
      ['SECOP', 'https://www.colombiacompra.gov.co/']
    ]
  },
  {
    title: 'Sitios recomendados', links: [
      ['Licencias Creative Commons', 'https://creativecommons.org/licenses/?lang=es'],
      ['Dirección Nacional de Derechos de Autor', 'https://www.derechodeautor.gov.co/es']
    ]
  }
]
