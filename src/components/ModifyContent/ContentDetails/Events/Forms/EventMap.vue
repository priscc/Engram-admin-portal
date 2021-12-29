<template>
  <div id="EventMap">
    <v-card class="mx-auto mt-4" width="62vw" height="40vw">
      <v-card class="mx-auto" width="62vw" height="5vw" color="#273238">
        <div class="d-flex">
          <v-container class="pt-8 pl-12 d-flex">
            <div id="nav">
              <router-link
                class="col"
                to="/addcontent/modifycontent/events/general"
                exact
                >General</router-link
              >
              <router-link
                class="col"
                to="/addcontent/modifycontent/events/map"
                exact
                >Map</router-link
              >
              <router-link
                class="col"
                to="/addcontent/modifycontent/events/text"
                exact
                >Text</router-link
              >
              <router-link
                class="col"
                to="/addcontent/modifycontent/events/resources"
                exact
                >Resources</router-link
              >
            </div>
          </v-container>
          <div class="d-flex justify-end">
            <span class="material-icons">
              <v-icon
                size="40"
                color="#3891A6"
                @click="closeForm('Events', '/events')"
              >
                disabled_by_default
              </v-icon>
            </span>
          </div>
        </div>
      </v-card>
      <v-row>
        <v-col class="d-flex justify-end mr-5">
          <v-btn class="white--text" width="140" color="#3891A6" elevation="2"
            >Save</v-btn
          >
          <!-- @click="handleSave" -->
        </v-col>
      </v-row>
      <v-row class="mx-4">
        <v-col id="mapCol">
          <div class="legend d-flex align-center pb-6">Hover over map</div>
          <div class="view" id="map"></div>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="8" class="d-flex align-start pl-0">
              <div>Event Coordinates:</div>
            </v-col>
            <v-col>
              <div class="d-flex justify-end">
                <v-btn class="white--text" small color="#3891A6" elevation="2">
                  + Map
                </v-btn>
                <!-- @click="cleaningCoordinates" -->
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-textarea
              outlined
              name="input-7-4"
              filled
              label="paste coordinates"
              background-color="grey lighten-2"
            ></v-textarea>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<!-- <script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import countries from "@/countries.json";
import * as d3 from "d3";
import * as topojson from "topojson";

export default {
  data() {
    return {
      items: countries,
      data: [],
      sets: [
        {
          name: "Central Europe",
          set: d3.set([
            "BEL",
            "CHE",
            "DEU",
            "AUT",
            "ESP",
            "FRA",
            "ATF",
            "GBR",
            "GGY",
            "JEY",
            "FLK",
            "SGS",
            "GRC",
            "MLT",
            "IRL",
            "ITA",
            "LUX",
            "NLD",
            "AND",
            "POL",
            "PRT",
            "TUR",
            "CYP",
            "CYN",
            "MON",
            "ALD",
            "IMN",
            "LTU",
            "LVA",
            "EST",
            "BLR",
            "UKR",
            "MDA",
            "ROU",
            "HUN",
            "SVK",
            "SVN",
            "HRV",
            "BIH",
            "CZE",
            "BGR",
            "KOS",
            "MKD",
            "ALB",
            "MNE",
            "SRB",
          ]),
        },
        {
          name: "Northern Europe",
          set: d3.set(["DNK", "FRO", "FIN", "GRL", "ISL", "NOR", "SWE"]),
        },
        {
          name: "North America",
          set: d3.set(["CAN", "MEX", "USA"]),
        },
        {
          name: "Caribbean",
          set: d3.set([
            "BLZ",
            "CRI",
            "CUB",
            "GTM",
            "HND",
            "NIC",
            "PAN",
            "SLV",
            "HTI",
            "JAM",
            "DOM",
            "PRI",
            "BHS",
            "TCA",
            "ATG",
            "DMA",
            "BRB",
            "GRD",
          ]),
        },
        {
          name: "South America",
          set: d3.set([
            "ARG",
            "BOL",
            "BRA",
            "CHL",
            "COL",
            "ECU",
            "FLK",
            "GUY",
            "PRY",
            "PER",
            "SUR",
            "URY",
            "VEN",
            "TTO",
          ]),
        },
        {
          name: "Africa",
          set: d3.set([
            "AGO",
            "BDI",
            "BEN",
            "BFA",
            "BWA",
            "CAF",
            "CIV",
            "CMR",
            "COD",
            "COD",
            "COG",
            "COM",
            "CPV",
            "DJI",
            "DZA",
            "EGY",
            "ERI",
            "ETH",
            "GAB",
            "GHA",
            "GIN",
            "GMB",
            "GNB",
            "GNQ",
            "KEN",
            "LBR",
            "LBY",
            "LSO",
            "MAR",
            "MDG",
            "MLI",
            "MOZ",
            "MRT",
            "MUS",
            "MWI",
            "MYT",
            "NAM",
            "NER",
            "NGA",
            "REU",
            "RWA",
            "ESH",
            "SDN",
            "SDS",
            "SEN",
            "SHN",
            "SHN",
            "SLE",
            "SOM",
            "SOL",
            "SSD",
            "STP",
            "STP",
            "SWZ",
            "SYC",
            "TCD",
            "TGO",
            "TUN",
            "TZA",
            "TZA",
            "UGA",
            "ZAF",
            "ZMB",
            "ZWE",
          ]),
        },
        {
          name: "South Pacific",
          set: d3.set(["AUS", "NZL"]),
        },
        {
          name: "India",
          set: d3.set(["IND", "BGD", "LKA"]),
        },
        {
          name: "Orient",
          set: d3.set([
            "AZE",
            "ARE",
            "QAT",
            "IRN",
            "AFG",
            "PAK",
            "BHR",
            "SAU",
            "YEM",
            "OMN",
            "SYR",
            "JOR",
            "IRQ",
            "KWT",
            "ISR",
            "LBN",
            "PSX",
            "PSR",
            "GEO",
            "ARM",
          ]),
        },
        {
          name: "Russia",
          set: d3.set(["RUS", "KAZ", "UZB", "TKM", "KGZ", "TJK"]),
        },

        // {
        //   name: "China",
        //   set: d3.set(["CHN"]),
        // },
        {
          name: "Asia",
          set: d3.set([
            "BTN",
            "CHN",
            "JPN",
            "IDN",
            "MNG",
            "NPL",
            "MMR",
            "THA",
            "KHM",
            "LAO",
            "VNM",
            "PRK",
            "KOR",
            "TWN",
            "MYS",
            "PNG",
            "SLB",
            "VUT",
            "NCL",
            "BRN",
            "PHL",
            "TLS",
            "HKG",
            "FJI",
            "GUM",
            "PLW",
            "FSM",
            "MNP",
            "KAS",
          ]),
        },
      ],
      width: null,
      mapRatio: null,
      height: null,
      projection: null,
      path: null,
      svg: null,
      coordinatesMD: "",
      coordinates: null,
      // coordinates: [
      //   [
      //     { lon: 114.7000004839849, lat: 42.02254999787689 },
      //     { lon: 113.1672067240925, lat: 40.58903258718775 },
      //     { lon: 108.5885758869572, lat: 38.01556166653811 },
      //     { lon: 104.4627858529494, lat: 37.53921058237947 },
      //     { lon: 102.1835644979335, lat: 34.91691173911467 },
      //     { lon: 100.999099564981, lat: 33.99707385393174 },
      //     { lon: 97.18808307950999, lat: 32.3025788858757 },
      //     { lon: 95.66013730464984, lat: 29.09017865729048 },
      //     { lon: 98.57342394735846, lat: 28.2005605394243 },
      //     { lon: 101.8740222074411, lat: 26.13804480224899 },
      //     { lon: 104.9973476309196, lat: 24.53510765041384 },
      //     { lon: 106.6435046493752, lat: 22.50452433642101 },
      //     { lon: 109.5871716936629, lat: 21.25475605332846 },
      //     { lon: 116.4594192837376, lat: 22.9595454015056 },
      //     { lon: 120.818784551134, lat: 26.99130045205105 },
      //     { lon: 122.2920420167496, lat: 30.74267415824754 },
      //     { lon: 119.3883278138953, lat: 34.83517495263233 },
      //     { lon: 122.8639669075088, lat: 37.2223767144566 },
      //     { lon: 120.9378067497715, lat: 38.30397804622267 },
      //     { lon: 119.5893720324662, lat: 37.42414800444499 },
      //     { lon: 117.8742460402969, lat: 38.72758280400602 },
      //     { lon: 118.3845903213028, lat: 39.36174581708054 },
      //     { lon: 121.5839796969244, lat: 40.71770109427904 },
      //     { lon: 114.7000004839849, lat: 42.02254999787689 },
      //   ],
      // ],
    };
  },
  computed: {
    ...mapFields("events", [
      "currentEvent.descriptionMD",
      "currentEvent.mainMD",
    ]),
  },
  methods: {
    ...mapActions("events", ["handleSave", "closeForm"]),
    cleaningCoordinates() {
      var str = this.coordinatesMD;
      var polygon = [];
      var start = 0;
      var comma = 1;
      var dic = { lon: 0, lat: 0 };
      for (var i = 0; i < str.length; i++) {
        if (str[i] == "," && comma == 1) {
          dic.lon = parseFloat(str.substring(start, i));
          start = i + 1;
          comma++;
        } else if (str[i] == "," && comma == 2) {
          dic.lat = parseFloat(str.substring(start, i));
          start = i;
          comma++;
        } else if (str[i] == " ") {
          polygon.push(dic);
          dic = { lon: 0, lat: 0 };
          start = i + 1;
          comma = 1;
        }
      }
      this.coordinatesMD = "";
      this.coordinates.push(polygon);
      this.primary();
    },
    async primary() {
      let list = document.getElementById("mapCol");
      if (list != null) {
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
      }

      d3.select(window).on("resize", this.resize);

      var width = 5 * document.querySelector("#mapCol").offsetWidth;
      var mapRatio = 0.7;
      var height = width * mapRatio;

      var projection = d3.geo
        .mercator()
        .scale(width / 1.5 / Math.PI)
        .rotate([-1, 0])
        .translate([width / 1.5, (height * 1.35) / 2])
        .precision(0.1);

      var path = d3.geo.path().projection(projection);

      var svg = d3
        .select("#map")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin")
        .attr("viewBox", "0 0 2000 2700")
        .classed("svg-content-responsive", true)
        .append("g");

      var w = this.items;

      svg
        .append("path")
        .datum(
          topojson.merge(
            w,
            w.objects.units.geometries.filter(function(d) {
              return d.id !== "ATA"; // Sorry Antarctica
            })
          )
        )
        .attr("class", "border")
        .attr("d", path)
        .attr("fill", "#d9edf7");

      for (var i = 0; i < this.sets.length; i++) {
        svg
          .append("path")
          .datum(
            topojson.merge(
              w,
              w.objects.units.geometries.filter(
                function(d) {
                  return this.sets[i].set.has(d.id);
                }.bind(this)
              )
            )
          )
          .attr("class", "regions selected")
          .attr("d", path)
          .attr({ "data-name": this.sets[i].name })
          .attr("fill", "#464646")
          .on("mouseover", function() {
            var region = d3.select(this);
            region.attr("fill", "#ff9800");
            document.querySelector(".legend").innerText = region.attr(
              "data-name"
            );
          })
          .on("mouseout", function() {
            var region = d3.select(this);
            region.attr("fill", "#464646");
            document.querySelector(".legend").innerText = "Hover of Map";
          });
      }

      // //This is the accessor function we talked about above
      // var lineFunction = d3.svg
      //   .line()
      //   .x(function(d) {
      //     var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
      //     return x[0];
      //   })
      //   .y(function(d) {
      //     var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
      //     return x[1];
      //   })
      //   .interpolate("linear");

      // //The line SVG Path we draw
      // // this.coordinates.forEach((polygon) => {
      // // console.log(polygon);
      // for (var c = 0; c < this.coordinates.length; c++) {
      //   console.log(this.coordinates);
      //   // var polygon = this.coordinates[0];
      //   // console.log(polygon);
      //   svg
      //     .append("path")
      //     .attr("d", lineFunction(this.coordinates[c]))
      //     // .attr("stroke", "blue")
      //     // .attr("stroke-width", 2)
      //     .attr("fill", "#BDFF00");
      // }
    },
  },
  mounted() {
    this.primary();
  },
};
</script> -->

<style lang="scss" scoped>
#nav {
  a {
    padding: 4px 24px;
    text-decoration: none;
    color: #ffffff;
    font-weight: lighter;
    background-color: #5b6368;

    &.router-link-exact-active {
      background-color: #3891a6;
    }
  }
}
</style>
