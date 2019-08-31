import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { DeviceQueueService } from './device-queue.service';
import { QueuePicture } from 'viewmodel/acsResponse/queue-picture';

@Component({
  selector: 'device-queue',
  templateUrl: './device-queue.component.html',
  styleUrls: ['./device-queue.component.css'],
  providers: [DeviceQueueService]
})

export class DeviceQueueComponent extends SuperComponentService implements OnInit {

  searching: boolean = false
  loadingphrase: string

  constructor(private deviceQueueService: DeviceQueueService,
    public variavelHolderService: VariavelHolderService,
    public systemHolderService: SystemHolderService,
    public toastyComponent: ToastyComponent) {
    super(toastyComponent)

  }

  ngOnInit() {
    this.getDeviceQueue()
  }

  getDeviceQueue() {
    this.loadingphrase = "Consultando fila de comandos do dispositivo";
    this.searching = true
    this.deviceQueueService.getDeviceActionQueue(this.variavelHolderService.equipamento).then(r => {
      this.variavelHolderService.queuePicture = r
    }, e => {
      this.callToasty("Ops, aconteceu algo.", e.mError, "error", 10000);
    }).then(x => {
      this.searching = false
    })
  }

  clearDeviceQueue() {
    this.loadingphrase = "Limpando e reconsultando fila de comandos do dispositivo";
    this.searching = true
    this.deviceQueueService.clearDeviceActionQueue(this.variavelHolderService.equipamento).then(r => {
      this.variavelHolderService.queuePicture = r
    }, e => {
      this.callToasty("Ops, aconteceu algo.", e.mError, "error", 10000);
    }).then(x => {
      this.searching = false
    })
  }



}
