import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-order-approval-form',
  templateUrl: './order-approval-detail-form.component.html',
})
export class OrderApprovalDetailFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
