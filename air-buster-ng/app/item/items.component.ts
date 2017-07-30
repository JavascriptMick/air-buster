import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    public icons: any = this.getIcons();
    public aqiRating = "CALCULATING";
    public aqiRatings = ["V-GOOD", "GOOD", "FAIR", "POOR", "V-POOR", "HAZARD"]
    public locationString = "Randwick";
    public dayName = "Today"
    public dayOffset = 0

    currentDate = new Date();

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        this.dayOffset = 0;
        this.aqiRating = this.aqiRatings[this.dayOffset];
    }

    onChangeDayOffset(newOffset){
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var newDate = new Date(this.currentDate.getTime() + (1000 * 60 * 60 * 24 * newOffset));
        var dayName = days[newDate.getDay()];
        console.log(dayName);

        switch(newOffset){
            case 0: this.dayName = "Today"
            default: this.dayName = dayName
        }
        this.dayOffset = newOffset;
        this.aqiRating = this.aqiRatings[this.dayOffset];
    }

    private getIcons(){
        var icons = {};
        icons['fa-cloud'] = String.fromCharCode(0xf0c2);
        icons['fa-sun-o'] = String.fromCharCode(0xf185);
        icons['fa-tint'] = String.fromCharCode(0xf043);
        icons['fa-umbrella'] = String.fromCharCode(0xf0e9);
        icons['fa-icon-map-marker'] = String.fromCharCode(0xf041);

        return icons
    }
}