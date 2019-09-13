<template>
  <div class="div_fondo_udg">
    <h1>Estadisticas</h1>

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
    
    <p> {{ $data.seleccionPie }} </p>


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

</style>




