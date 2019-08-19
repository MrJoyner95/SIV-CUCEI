<template>
  <div>


    <footer id="footer" class="py-4 bg-dark text-white-50">
      <div class="container text-center">

        <!-- <hr class="mt-5"> -->

        <b-row no-gutters>
          <b-col>
            <img src="@/assets/footer/udg.png" align="left" alt="UDG" height="120">
            <img src="@/assets/footer/cucei.png" align="left" alt="CUCEI" height="120">            
            <br>
            <p align="start" style="line-height: 2px;">Universidad de Guadalajara</p>
            <p align="start" style="line-height: 2px;">CUCEI</p>
            <p align="start" style="line-height: 2px;">Derechos reservados 2019 &copy;</p>
          </b-col>

          <b-col col lg="3">
            <h5 class="titleColor">Recursos</h5>
            <ul class="lista">
              <li>
                <a href="#" class="footer_link">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="#" class="footer_link">Tutoriales</a>
              </li>
              <li>
                <a href="#" class="footer_link">Ayuda</a>
              </li>
            </ul>
          </b-col>

          <b-col col lg="3">
            <h5 class="titleColor">Referencia</h5>
            <ul class="lista">
              <li>
                <a href="#" class="footer_link">Créditos</a>
              </li>
              <li>
                <a href="#" class="footer_link">Sugerencias</a>
              </li>
              <li>
                <a href="#" class="footer_link">Reporte de errores</a>
              </li>
            </ul>
          </b-col>
        </b-row>

        <b-row class="mt-4" align-h="center">
          <b-col cols="8">
            <p align="center"><strong>S</strong>istema <strong>I</strong>ntegral de <strong>V</strong>iáticos CUCEI. Versión 1.0.0.
            <br>Diseño por Octavio Romo</p>
          </b-col>
        </b-row>

      </div>
    </footer>




  </div>
</template>



<script>
export default {
  
}
</script>



<style scoped>

#footer {
  flex-shrink: none;
}

.lista{
  list-style-type:none;
  padding: 0%;
}

.footer_link, .footer_link:hover{
  color: #ffffff;
}


/* 
  * Fuente:
*/
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');

body{
  /* background: #F8FAF0; */
  font-family: 'Lato', sans-serif;
}
</style>


