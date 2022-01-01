<template>
  <div id="EventMap">
    <v-card class="mx-auto mt-4 pb-6" width="62vw" height="auto">
      <navbar />
      <v-container class="px-10">
        <div class="d-flex justify-end">
          <v-btn
            class="white--text"
            width="140"
            color="#3891A6"
            elevation="2"
            :disabled="Object.keys(this.coordinates).length == 0"
            @click="handleSave"
          >
            Save
          </v-btn>
        </div>
        <v-row>
          <v-col>
            <div class="d-flex justify-start font-weight-bold">
              Event Coordinates:
            </div>
            <v-switch
              v-model="switch1"
              :label="`Is an dictionary array: ${switch1.toString()}`"
            ></v-switch>
            <v-textarea
              outlined
              v-model="coordinatesMD"
              filled
              label="paste coordinates"
              rows="3"
              row-height="30"
            ></v-textarea>
            <div class="d-flex justify-end">
              <v-btn
                class="white--text"
                @click="cleaningCoordinates"
                small
                color="#3891A6"
                elevation="2"
              >
                Add Map
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col id="mapCol">
            <div class="legend d-flex align-center pb-2 font-weight-bold">
              View coordinates added in below map
            </div>
            <div class="d-flex justify-start pb-10">
              <v-btn
                @click="clearingCoordinates"
                outlined
                color="#3891A6"
                :disabled="Object.keys(this.coordinates).length == 0"
                small
              >
                Clear
              </v-btn>
            </div>

            <div class="view" id="map"></div>
          </v-col>
        </v-row>
        <v-row> </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import countries from "@/countries.json";
import * as d3 from "d3";
import * as topojson from "topojson";
import navbar from "./EventCardHeader.vue";

export default {
  components: { navbar },
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
      switch1: false,
    };
  },
  computed: {
    ...mapFields("events", { coordinates: "currentEvent.coordinates" }),
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
      var key = Object.keys(this.coordinates).length + 1;
      this.coordinates[key] = polygon;
      this.primary();
    },
    clearingCoordinates() {
      this.coordinatesMD = "";
      this.coordinates = {};
      this.primary();
    },
    async primary() {
      let list = document.getElementById("map");
      if (list != null) {
        // erase map
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
      }

      d3.select(window).on("resize", this.resize);

      var width = 3.1 * document.querySelector("#map").offsetWidth;
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
          .attr("fill", "#464646");
        // .on("mouseover", function() {
        //   var region = d3.select(this);
        //   region.attr("fill", "#ff9800");
        //   document.querySelector(".legend").innerText = region.attr(
        //     "data-name"
        //   );
        // })
        // .on("mouseout", function() {
        //   var region = d3.select(this);
        //   region.attr("fill", "#464646");
        //   document.querySelector(".legend").innerText = "Hover of Map";
        // });
      }

      var lineFunction = d3.svg
        .line()
        .x(function(d) {
          var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
          return x[0];
        })
        .y(function(d) {
          var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
          return x[1];
        })
        .interpolate("linear");

      var coordinates = this.coordinates;
      console.log("in primary" + coordinates);

      Object.keys(coordinates).forEach((map) => {
        svg
          .append("path")
          .attr("d", lineFunction(coordinates[map]))
          .attr("stroke", "red")
          .attr("stroke-width", 2)
          .attr("fill", "#BDFF00");
      });
    },
  },
  mounted() {
    this.primary();
  },
};
</script>

<style></style>
