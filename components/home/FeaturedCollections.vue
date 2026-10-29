<script setup lang="ts">
const { all } = useInstitutionalCollections()
</script>

<template>
  <section id="colecciones" class="container-bdb py-12">
    <div class="d-flex flex-wrap align-end justify-space-between mb-6 ga-2">
      <div>
        <h2 class="text-h4 section-title">Colecciones recomendadas del mes</h2>
        <p class="section-sub">Conoce distintas colecciones de la Biblioteca Digital de Bogotá</p>
      </div>
      <v-btn color="primary" to="/colecciones/institucionales">Ver todas</v-btn>
    </div>
    <v-row>
      <v-col v-for="c in all" :key="c.id" cols="12" sm="6" md="3">
        <CollectionCard :collection="c" />
      </v-col>
    </v-row>
  </section>
</template>
