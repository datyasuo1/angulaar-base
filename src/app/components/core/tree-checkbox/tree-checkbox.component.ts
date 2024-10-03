import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';

@Component({
    selector: 'app-tree-checkbox',
    templateUrl: './tree-checkbox.component.html',
    styleUrls: ['./tree-checkbox.component.scss'],
    providers: [TreeDragDropService],
})
export class TreeCheckboxComponent<T = unknown> {
    @Input() label: string = '';

    @Input() value!: T[];

    @Input() selection!: T[];

    @Input() filter: boolean = true;

    @Input() loading: boolean = false;

    @Input() disabled: boolean = false;

    @Input() draggableNodes: boolean = false;

    @Input() droppableNodes: boolean = false;

    @Input() emptyMessage: string = 'Không có dữ liệu';

    @Input() autofocus: boolean = false;

    @Input() disabledIcon: boolean = true;

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onSelectChange: EventEmitter<T[]> = new EventEmitter();

    @Output() onNodeDrop: EventEmitter<T[]> = new EventEmitter();

    ngOnInit() {
        if (this.disabledIcon) {
            this.setIconDisabled(this.value);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value'] && !changes['value']?.firstChange) {
            this.setItemDisabled(this.value);
            if (this.disabledIcon) {
                this.setIconDisabled(this.value);
            }
        }
    }

    setIconDisabled(items: TreeNode<T>[]) {
        items.forEach((item: TreeNode<T>) => {
            item['icon'] = '';

            if (item.children && item.children.length > 0) {
                this.setIconDisabled(item.children);
            }
        });
    }

    setItemDisabled(items: TreeNode<T>[]) {
        items.forEach((item: TreeNode<T>) => {
            item.selectable = !this.disabled;

            if (item.children && item.children.length > 0) {
                this.setItemDisabled(item.children);
            }
        });
    }

    handleNodeDropChange() {
        this.onNodeDrop.emit(this.value);
    }

    handleSelectChange(data: T[]) {
        this.onSelectChange.emit(data);
    }
}
