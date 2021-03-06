import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { ICON_TYPE } from '../../../misc/icon';

@Component({
  selector: 'cx-store-finder-search',
  templateUrl: './store-finder-search.component.html',
})
export class StoreFinderSearchComponent {
  searchBox: FormControl = new FormControl();
  iconTypes = ICON_TYPE;

  constructor(private routingService: RoutingService) {}

  findStores(address: string) {
    this.routingService.go(['store-finder/find'], { query: address });
  }

  viewStoresWithMyLoc() {
    this.routingService.go(['store-finder/find'], { useMyLocation: true });
  }

  onKey(event: any) {
    if (
      this.searchBox.value &&
      this.searchBox.value.length &&
      event.key === 'Enter'
    ) {
      this.findStores(this.searchBox.value);
    }
  }
}
