<template>
  <div class="div_fondo_udg">

    <b-row align-h="center">
      <b-col md="9">

        <b-tabs content-class="mt-3" align="center">
      
          <b-tab title="Comisiones" active>
            <b-card no-body class="card_shadow_md">
              <!-- <b-row>
                <b-col md="1">
                  <h5>Año: </h5>
                  <b-form-select v-model="anioSeleccionado" :options="anioOpciones"></b-form-select>
                </b-col>
              </b-row> -->


              <!-- Vista General -->
              <hr>
              <p class="seccion_titulo">Vista General</p>

              <b-row class="mt-2">
                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Solicitudes</h3>
                    <hr>
                    <h5 class="card_summary_text">Solicitudes recibidas:</h5>
                    <h3 class="card_summary_text">86</h3>
                    <p></p>
                    <h5 class="card_summary_text">Solicitudes aceptadas:</h5>
                    <h3 class="card_summary_text">64 <span style="font-size: 75%;">(72%)</span></h3>
                    <p></p>
                    <h5 class="card_summary_text">Solicitudes rechazadas:</h5>
                    <h3 class="card_summary_text">22 <span style="font-size: 75%;">(28%)</span></h3>
                  </b-card>
                </b-col>

                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Comisiones</h3>
                    <hr>
                    <h5 class="card_summary_text">Duración promedio:</h5>
                    <h3 class="card_summary_text">7 días</h3>
                    <p></p>
                    <h5 class="card_summary_text">Gasto promedio (viáticos):</h5>
                    <h3 class="card_summary_text">$18,534 MXN</h3>
                  </b-card>
                </b-col>

                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Destinos</h3>
                    <hr>
                    <h5 class="card_summary_text">Destinos más populares:</h5>
                    <h3 class="card_summary_text">España</h3>
                    <h3 class="card_summary_text">Alemania</h3>
                    <h3 class="card_summary_text">Francia</h3>
                    <h3 class="card_summary_text">Colombia</h3>
                    <h3 class="card_summary_text">Estados Unidos</h3>
                  </b-card>
                </b-col>

                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Eventos</h3>
                    <hr>
                    <h5 class="card_summary_text">Eventos más populares:</h5>
                    <h3 class="card_summary_text">DeveloperWeek</h3>
                    <h3 class="card_summary_text">DockerCon</h3>
                    <h3 class="card_summary_text">DevOps Con</h3>
                    <h3 class="card_summary_text">OSCON</h3>
                    <h3 class="card_summary_text">Microsoft Ignite</h3>
                  </b-card>
                </b-col>
              </b-row>

              

              <!-- Solicitudes de Comisiones -->
              <b-row class="mt-5" align-h="center">
                <b-col md="10">
                  <b-card 
                    no-body 
                    class="card_chart"
                    header-class="card_chart_header"
                    header="Solicitudes de comisión recibidas"
                    header-tag="header"
                  >
                    <apexchart 
                      height="400"
                      width="100%"
                      type="area"
                      :series="seriesSolicitudesRecibidas"
                      :options="chartSolicitudesRecibidas" 
                    >
                    </apexchart>
                  </b-card>
                </b-col>
              </b-row>



              <!-- Departamentos -->
              <hr class="mt-5">
              <p class="seccion_titulo">Departamentos</p>

              <b-row class="mt-2">
                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Departamentos más recurrentes</h3>
                    <hr>
                    <h5 class="card_summary_text" style="text-align: left;">• 1. Ciencias Computacionales:</h5>
                    <h4 class="card_summary_text">16 <span style="font-size: 75%;">Comisiones solicitadas</span></h4>
                    <h4 class="card_summary_text">16 <span style="font-size: 75%;">Comisiones concluidas</span></h4>
                    <p></p>
                    <h5 class="card_summary_text" style="text-align: left;">• 2. Electrónica:</h5>
                    <h4 class="card_summary_text">12 <span style="font-size: 75%;">Comisiones solicitadas</span></h4>
                    <h4 class="card_summary_text">11 <span style="font-size: 75%;">Comisiones concluidas</span></h4>
                    <p></p>
                    <h5 class="card_summary_text" style="text-align: left;">• 3. Ingeniería Industrial:</h5>
                    <h4 class="card_summary_text">8 <span style="font-size: 75%;">Comisiones solicitadas</span></h4>
                    <h4 class="card_summary_text">6 <span style="font-size: 75%;">Comisiones concluidas</span></h4>
                  </b-card>
                </b-col>

                <b-col lg="9">
                  <b-card 
                    no-body 
                    class="card_chart"
                    header-class="card_chart_header"
                    header="Solicitudes recibidas por departamento"
                    header-tag="header"
                  >
                    <apexchart 
                      height="400"
                      width="100%"
                      type="bar"
                      :series="seriesDeps"
                      :options="chartDeps" 
                    >
                    </apexchart>
                  </b-card>
                </b-col>
              </b-row>



              <!-- Rangos y Solicitantes -->
              <hr class="mt-5">
              <p class="seccion_titulo">Rangos y Solicitantes</p>

              <b-row class="mt-2">
                <b-col lg="5">
                  <b-card 
                    no-body 
                    class="card_chart"
                    header-class="card_chart_header"
                    header="Rangos más recurrentes"
                    header-tag="header"
                    style="height: 100%;"
                  >
                    <apexchart 
                      height="350"
                      type="pie"
                      :series="seriesRangos"
                      :options="chartRangos" 
                    >
                    </apexchart>
                  </b-card>
                </b-col>

                <b-col lg="7">
                  <b-card 
                    no-body 
                    class="card_chart"
                    header-class="card_chart_header"
                    header="Solicitantes más recurrentes"
                    header-tag="header"
                    style="height: 100%;"
                  >
                    <b-table responsive striped hover :items="topSolicitantes"></b-table>
                  </b-card>
                </b-col>
              </b-row>
              
            </b-card>
          </b-tab>






          <b-tab title="Departamentos">
            <b-card no-body class="card_shadow_md">

              <div style="display: inline-block;">
                <h5>Departamento: </h5>
                <div style="display: inline-block;">
                  <b-form-select v-model="depSeleccionado" :options="depOpciones">
                  </b-form-select>
                </div>
              </div>
              


              <!-- Vista General -->
              <hr>
              <p class="seccion_titulo">{{depSeleccionado}}</p>

              <!-- Resumen Departamento -->
              
              <b-row class="mt-2">
                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Solicitudes</h3>
                    <hr>
                    <h5 class="card_summary_text">Solicitudes recibidas:</h5>
                    <h3 class="card_summary_text">86</h3>
                    <p></p>
                    <h5 class="card_summary_text">Solicitudes aceptadas:</h5>
                    <h3 class="card_summary_text">64 <span style="font-size: 75%;">(72%)</span></h3>
                    <p></p>
                    <h5 class="card_summary_text">Solicitudes rechazadas:</h5>
                    <h3 class="card_summary_text">22 <span style="font-size: 75%;">(28%)</span></h3>
                  </b-card>
                </b-col>

                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Comisiones</h3>
                    <hr>
                    <h5 class="card_summary_text">Duración promedio:</h5>
                    <h3 class="card_summary_text">7 días</h3>
                    <p></p>
                    <h5 class="card_summary_text">Gasto promedio (viáticos):</h5>
                    <h3 class="card_summary_text">$18,534 MXN</h3>
                  </b-card>
                </b-col>

                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Destinos</h3>
                    <hr>
                    <h5 class="card_summary_text">Destinos más populares:</h5>
                    <h3 class="card_summary_text">España</h3>
                    <h3 class="card_summary_text">Alemania</h3>
                    <h3 class="card_summary_text">Francia</h3>
                    <h3 class="card_summary_text">Colombia</h3>
                    <h3 class="card_summary_text">Estados Unidos</h3>
                  </b-card>
                </b-col>

                <b-col lg="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Eventos</h3>
                    <hr>
                    <h5 class="card_summary_text">Eventos más populares:</h5>
                    <h3 class="card_summary_text">DeveloperWeek</h3>
                    <h3 class="card_summary_text">DockerCon</h3>
                    <h3 class="card_summary_text">DevOps Con</h3>
                    <h3 class="card_summary_text">OSCON</h3>
                    <h3 class="card_summary_text">Microsoft Ignite</h3>
                  </b-card>
                </b-col>
              </b-row>



              <b-row class="mt-4">

                <b-col md="3">
                  <b-card no-body class="card_summary">
                    <h3 class="card_summary_text">Presupuesto</h3>
                    <hr>
                    <h5 class="card_summary_text">Total:</h5>
                    <h3 class="card_summary_text">$124,732.00 MXN</h3>
                    <p></p>
                    <h5 class="card_summary_text">Restante</h5>
                    <h3 class="card_summary_text">$48,142.00 MXN <span style="font-size: 75%;">(38%)</span></h3>
                    <apexchart 
                      type=radialBar
                      height=300
                      :options="radialOptions" 
                      :series="radialSeries"
                    />
                  </b-card>
                </b-col>

                <b-col md="9">
                  <b-card 
                    no-body 
                    class="card_chart"
                    header-class="card_chart_header"
                    header="Solicitudes de comisión"
                    header-tag="header"
                  >
                    <apexchart 
                      height="350"
                      width="100%"
                      type="area"
                      :series="seriesSolicitudesRecibidas"
                      :options="chartSolicitudesRecibidas" 
                    >
                    </apexchart>
                  </b-card>
                </b-col>
              </b-row>



              <!-- Rangos y Solicitantes -->
              <hr class="mt-5">
              <p class="seccion_titulo">Rangos y Solicitantes</p>

              <b-row class="mt-2">
                <b-col lg="5">
                  <b-card 
                    no-body 
                    class="card_chart"
                    header-class="card_chart_header"
                    header="Rangos más recurrentes"
                    header-tag="header"
                    style="height: 100%;"
                  >
                    <apexchart 
                      height="350"
                      type="pie"
                      :series="seriesRangos"
                      :options="chartRangos" 
                    >
                    </apexchart>
                  </b-card>
                </b-col>

                <b-col lg="7">
                  <b-card 
                    no-body 
                    class="card_chart"
                    header-class="card_chart_header"
                    header="Solicitantes más recurrentes"
                    header-tag="header"
                    style="height: 100%;"
                  >
                    <b-table responsive striped hover :items="topSolicitantes"></b-table>
                  </b-card>
                </b-col>
              </b-row>

              
              
            </b-card>
          </b-tab>



          <b-tab title="Presupuestos">
            <p>Presupuestos</p>
          </b-tab>

        </b-tabs>
      </b-col>
    </b-row>



    

    <!-- <h1>Estadisticas NOVO IN PORTUGUES</h1>

    <p>
      <label><b>Select Theme Palette</b> </label> &nbsp;
      <select @change="updateTheme">
        <option value="palette1">palette1</option>
        <option value="palette2">palette2</option>
        <option value="palette3">palette3</option>
        <option value="palette4">palette4</option>
        <option value="palette5">palette5</option>
        <option value="palette6">palette6</option>
        <option value="palette7">palette7</option>
        <option value="palette8">palette8</option>
        <option value="palette9">palette9</option>
        <option value="palette10">palette10</option>
      </select>
    </p>
    <apexcharts
      width="100%"
      height="350"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexcharts>


    <apexchart 
      type=pie 
      width=500 
      :options="chartOptionsPie" 
      :series="seriesPie"
    >
    </apexchart>


    <apexchart 
      height="350"
      width="100%"
      type="line"
      
      :series="seriesLine"
      :options="chartOptionsLine" 
      
    >
    </apexchart>
    
    <p> {{ $data.seleccionPie }} </p> -->


  </div>
</template>





<script>

  import VueApexCharts from "vue-apexcharts";

  export default {
    name: "Chart",
    components: {
      apexcharts: VueApexCharts
    },
    data: function() {
      return {

        /**
          Variables de control de elementos
        **/
        anioSeleccionado: null,
        anioOpciones: ["2018", "2019"],
        


        /**
          Objetos JSON recibidos desde el servidor
        */
        comisiones: {
          anio: null, // string | default: anio actual | * = todos los anios
          totalSolicitudes: null, // number
          totalAprobadas: null, // number
          totalRechazadas: null, // number
          destinosMasPopulares: null, // [string] | max: 5
          promedioViaticosPorComision: null, // string
          solicitantesMasRecurrentes: [
            {
              codigo: null, // string
              nombre: null, // string
              departamento: null, // string
              rango: null, // string
              totalComisionesSolicitadas: null, // string
              totalComisionesConcluidas: null, // string
            }
          ], // max: 5
          departamentosMasRecurrentes:[
            {
              nombre: null, // string
              director: null, // string
              totalComisionesSolicitadas: null, // string
              totalComisionesConcluidas: null, // string
            }
          ], // max: 5
          meses: [
            {
              fechaInicio: null, // string
              totalSolicitudes: null, // string
              totalAprobadas: null, // string
              totalRechazadas: null, // string
              destinosMasPopulares: null, // [string] | max: 3
              promedioViaticosPorComision: null, // string
              solicitantesMasRecurrentes: [
                {
                  codigo: null, // string
                  nombre: null, // string
                  departamento: null, // string
                  rango: null, // string
                  totalComisionesSolicitadas: null, // string
                  totalComisionesConcluidas: null, // string
                }
              ], // max: 3
              departamentosMasRecurrentes:[
                {
                  nombre: null, // string
                  director: null, // string
                  totalComisionesSolicitadas: null, // string
                  totalComisionesConcluidas: null, // string
                }
              ], // max: 3
            }
          ], // todos los meses transcurridos
        },



        comisiones2019: {
          anio: null, // string | default: anio actual | * = todos los anios
          totalSolicitudes: null, // number
          totalAprobadas: null, // number
          totalRechazadas: null, // number
          destinosMasPopulares: null, // [string] | max: 5
          promedioViaticosPorComision: null, // string
          solicitantesMasRecurrentes: [
            {
              codigo: null, // string
              nombre: null, // string
              departamento: null, // string
              rango: null, // string
              totalComisionesSolicitadas: null, // string
              totalComisionesConcluidas: null, // string
            }
          ], // max: 5
          departamentosMasRecurrentes:[
            {
              nombre: null, // string
              director: null, // string
              totalComisionesSolicitadas: null, // string
              totalComisionesConcluidas: null, // string
            }
          ], // max: 5
          meses: [
            {
              fechaInicio: null, // string
              totalSolicitudes: null, // string
              totalAprobadas: null, // string
              totalRechazadas: null, // string
              destinosMasPopulares: null, // [string] | max: 3
              promedioViaticosPorComision: null, // string
              solicitantesMasRecurrentes: [
                {
                  codigo: null, // string
                  nombre: null, // string
                  departamento: null, // string
                  rango: null, // string
                  totalComisionesSolicitadas: null, // string
                  totalComisionesConcluidas: null, // string
                }
              ], // max: 3
              departamentosMasRecurrentes:[
                {
                  nombre: null, // string
                  director: null, // string
                  totalComisionesSolicitadas: null, // string
                  totalComisionesConcluidas: null, // string
                }
              ], // max: 3
            }
          ], // todos los meses transcurridos
        },










        // ++++++++++++++++++++++++++++++++++++++++ Prueba visual (Solicitudes) ++++++++++++++++++++++++++++++++++++++++

        // ++++++++++++++++++++++++ Solicitudes recibidas ++++++++++++++++++++++++
        seriesSolicitudesRecibidas: [
          {
            name: "Recibidas",
            type: 'area',
            data: [8, 6, 12, 16, 10, 12, 8, 6, 4]
          },
          {
            name: 'Aceptadas',
            type: 'area',
            data: [6, 4, 8, 12, 8, 9, 6, 5, 4]
          },
          {
            name: 'Rechazadas',
            type: 'area',
            data: [2, 2, 4, 4, 2, 3, 2, 1, 0]
          }
        ],
        chartSolicitudesRecibidas: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#436cab', '#1f9c30', '#b31b1b'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: '.',
            align: 'center'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 6
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiempre'],
            title: {
              text: 'Mes'
            }
          },
          yaxis: {
            title: {
              text: 'Solicitudes'
            },
            min: 0,
            max: 20
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
          ,
          plotOptions: {
            bar: {
              distributed: true
            }
          }
        },



        // ++++++++++++++++++++++++ Departamentos mas recurrentes ++++++++++++++++++++++++
        seriesDeps: [{
          name: 'Ciencias Computacionales',
          data: [44, 55, 41, 67, 22, 43, 21, 49]
        }, {
          name: 'Electrónica',
          data: [13, 23, 20, 8, 13, 27, 33, 12]
        }, {
          name: 'Ingeniería Industrial',
          data: [11, 17, 15, 15, 21, 14, 15, 13]
        }],
        chartDeps: {
          chart: {
            stacked: true,
            stackType: '100%',
            toolbar: {
              show: false
            }
          },
          colors: ['#436cab', '#1f9c30', '#20603c'],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiempre']
          },
          fill: {
            opacity: 1
          },

          legend: {
            position: 'top',
            offsetX: 0,
            offsetY: 5
          }
        },



        // ++++++++++++++++++++++++ Rangos ++++++++++++++++++++++++
        seriesRangos: [64, 26, 12],
        chartRangos: {
          labels: ['Académicos y Administrativos (AA)', 'Rangos Medios (RM)', 'Directivos (DD)'],
          responsive: [{
            breakpoint: 300,
            options: {
              chart: {
              },
              legend: {
                position: 'top'
              }
            },
            colors: ['#436cab', '#1f9c30', '#b31b1b'],
          }]
        },



        topSolicitantes: [
          { codigo: 112233, nombre: 'Wilhelm II', departamento: 'Ciencias Computacionales', rango: 'AA', solicitudes: '6', concluidas: '6' },
          { codigo: 223344, nombre: 'Mustafa Kemal', departamento: 'Ciencias Computacionales', rango: 'AA', solicitudes: '5', concluidas: '4' },
          { codigo: 556677, nombre: 'Nicholas II', departamento: 'Electrónica', rango: 'RM', solicitudes: '4', concluidas: '4' },
          { codigo: 445566, nombre: 'George V', departamento: 'Ingeniería Industrial', rango: 'DD', solicitudes: '2', concluidas: '2' },
          { codigo: 334455, nombre: 'Jozef Pilsudski', departamento: 'Electrónica', rango: 'AA', solicitudes: '2', concluidas: '2' },
        ],






        // ++++++++++++++++++++++++++++++++++++++++ Prueba visual (Departamentos) ++++++++++++++++++++++++++++++++++++++++

        depSeleccionado: "Ciencias Computacionales",
        depOpciones: ["Ciencias Computacionales", "Electrónica", "Ingeniería Industrial"],



        radialSeries: [38],
        radialOptions: {
          chart: {
            offsetY: -20
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#ffffff",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                shadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#ffffff',
                  opacity: 1,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '22px',
                  color: '#ffffff'
                }
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
            },
          },
          labels: ['Average Results'],
        },
















        

        


        



        chartOptions: {
          chart: {
            id: "basic-bar",
            animations: {
              speed: 200
            }
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            bar: {
              distributed: true
            }
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995]
          }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 30, 49]
          },
          {
            name: "presupuesto",
            data: [60, 50, 15, 10, 70]
          }
        ],






        seriesPie: [44, 55, 13, 43, 22],
        chartOptionsPie: {
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          
          chart: {
            events: {
              // selection: function(chartContext, { xaxis, yaxis }) {
              //   console.log("X: " + xaxis);
              //   console.log("Y: " + yaxis);
              // }
              dataPointSelection: function(event, chart, opts) {
                // console.log(event);
                // console.log(event);
                // console.log(config);
                if(opts.selectedDataPoints[0].length === 1){
                  var indSel = JSON.parse(JSON.stringify(opts.selectedDataPoints[0][0]));
                  console.log(indSel);
                  this.MostrarDatos(indSel);
                  // console.log(indSel);
                  // console.log(this.seriesPie[indSel]);
                  // console.log(this.chartOptionsPie.labels[indSel]);
                }
                
                // console.log(this.seriesPie[opts.selectedDataPoints[0]]);
                // console.log(this.chartOptionsPie.labels[opts.selectedDataPoints[0]]);
              }
            }
          }
          
        },

        seleccionPie: null,



        seriesLine: [
          {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33]
          },
          {
            name: "Low - 2013",
            data: [12, 11, 14, 18, 17, 13, 13]
          }
        ],
        chartOptionsLine: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Average High & Low Temperature',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            
            size: 6
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: 'Month'
            }
          },
          yaxis: {
            title: {
              text: 'Temperature'
            },
            min: 5,
            max: 40
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
          ,
          plotOptions: {
            bar: {
              distributed: true
            }
          }
        }



      };
    },
    methods: {
      updateTheme(e) {
        this.chartOptions = {
          theme: {
            palette: e.target.value
          }
        };
      },

      MostrarDatos(indSel){
        console.log(indSel);
        console.log(this.seriesPie[indSel]);
        console.log(this.chartOptionsPie.labels[indSel]);
      }
    }
  };

  // new Vue({
  //     el: '#chart',
  //     components: {
  //       apexchart: VueApexCharts,
  //     },
  //     data: {
  //       series: [44, 55, 13, 43, 22],
  //       chartOptions: {
  //         labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  //         responsive: [{
  //           breakpoint: 480,
  //           options: {
  //             chart: {
  //               width: 200
  //             },
  //             legend: {
  //               position: 'bottom'
  //             }
  //           }
  //         }]
  //       }
  //     },

  //   });

</script>





<style>

.card_shadow_md{
  opacity: .96;
  padding: 2%;
  /* Sombra */
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}

.seccion_titulo{
  color: #20603c;
  font-size: 200%; 
  font-weight: 600;
  text-align: center;
}

.card_summary{
  /* Contenido */
  padding: 5%;
  height: 100%;
  /* text-align: center; */
  /* vertical-align: middle; */
  /* Sombra */
  /* -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.25); */
  /* Fondo */
  background: rgb(5,25,55);
  background: linear-gradient(20deg, rgba(5,25,55,0.80) 20%, rgba(32,96,60,0.80) 80%);
}

.card_summary:hover{
  /* Sombra */
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.4);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.4);
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.4);
}

.card_summary_text{
  color:#ffffff;
  text-align: center;
  line-height: 100%;
}

.card_chart{
  background: rgb(5,25,55);
  background: linear-gradient(20deg, rgba(5,25,55,0.20) 20%, rgba(32,96,60,0.20) 80%);
}

.card_chart_header{
  /* Fondo */
  background: rgb(5,25,55);
  background: linear-gradient(20deg, rgba(5,25,55,0.80) 20%, rgba(32,96,60,0.80) 80%);
  /* Texto */
  color:#ffffff;
  font-size: 130%;
  text-align: left;
}

</style>




