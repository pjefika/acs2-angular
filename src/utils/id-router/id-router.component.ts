import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'id-router-component',
    templateUrl: 'id-router.component.html',
    styleUrls: ['id-router.component.css']
})

export class IdRouterComponent implements OnInit, OnDestroy {

    private id: number;

    private sub: any;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    

}