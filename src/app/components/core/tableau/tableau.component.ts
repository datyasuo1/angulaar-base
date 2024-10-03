import { Component, ElementRef, Input, ViewChild } from '@angular/core';
declare let tableau: any;
@Component({
    selector: 'app-tableau',
    templateUrl: './tableau.component.html',
    styleUrls: ['./tableau.component.scss'],
})
export class TableauComponent {
    viz: any;

    @Input() vizUrl: string = '';

    @Input() hideTabs: boolean = true;

    @Input() height: string = '100%';

    @Input() width: string = '100%';

    @ViewChild('vizContainer') containerDiv: ElementRef;

    ngAfterViewInit() {
        this.initTableau();
    }

    initTableau() {
        const options = {
            hideTabs: this.hideTabs,
            height: this.height,
            width: this.width
                ? this.width
                : this.containerDiv.nativeElement.offsetWidth,
            onFirstInteractive: () => {},
            onFirstVizSizeKnown: () => {},
        };
        this.viz = new tableau.Viz(
            this.containerDiv.nativeElement,
            this.vizUrl,
            options,
        );
    }
}
