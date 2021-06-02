import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    OnInit,
    ViewChild
} from '@angular/core';
import { CoverTypesRecordsCreationComponent } from '../../components/cover-types-records-creation/cover-types-records-creation.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Subscription } from 'rxjs';

const LOG_PREFIX: string = "[Cover Types Records Creation Modal]";

@Component({
    selector: 'sb-cover-types-records-creation-modal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './cover-types-records-creation-modal.component.html',
    styleUrls: ['cover-types-records-creation-modal.component.scss'],
})
export class CoverTypesRecordsCreationModalComponent implements OnInit {


    // Inject a reference to the Cover Types records creation component. 
    // This will provide a way of propagating save requests to it
    @ViewChild(CoverTypesRecordsCreationComponent) component!: CoverTypesRecordsCreationComponent;

    // Keep tabs on the current processing status.
    // These statuses include:
    // 1. new         - at the very beginning
    // 2. saving      - when the record is submitted for saving
    // 3. invalid     - when the record is submitted for saving and is found to include form control errors
    // 4. failed      - when the record is submitted for saving and an unexpected error occurs
    // 5. succeeded   - when the record is submitted for saving and all goes well
    // 6. retrying    - when the record is submitted for saving, fails and the saving is retried
    private _statusSubject$ = new BehaviorSubject<string>("new");
    readonly status$ = this._statusSubject$.asObservable();

    // Instantiate a central gathering point for all the component's subscriptions.
    // Makes it easier to unsubscribe from all subscriptions when the component is destroyed.   
    private _subscriptions: Subscription[] = [];

    constructor(
        public activeCoverTypesModal: NgbActiveModal,
        private log: NGXLogger) { }

    ngOnInit() {

        this.log.trace(`${LOG_PREFIX} Initializing Component`);
    }

    @HostListener('window:beforeunload')
    ngOnDestroy() {
        this.log.trace(`${LOG_PREFIX} Destroying Component`);
    }

    /**
     * Sets the processing status to 'saving', triggering a display change, and then 
     * propagates the saving request to the Cover Types records creation component
     */
    onSave() {
        this._statusSubject$.next("saving");
        this.component.save();
    }

    /**
     * Sets the processing status to 'succeeded' triggering a display change.
     */
    onSucceeded() {
        this._statusSubject$.next("succeeded");
    }

    /**
     * Sets the processing status to either 'failed' or 'invalid' triggering a display change.
     */
    onFailed(event: any) {
        switch (event) {
            case 400:
                this._statusSubject$.next("invalid");
                break;
            default:
                this._statusSubject$.next("failed");
        }

    }

    /**
     * Sets the processing status to 'retrying' triggering a display change.
     */
    onRetry() {
        this._statusSubject$.next("retrying");
    }


    /**
     * Sets the processing status to 'new' triggering a display change
     */
    onContinue() {
        this._statusSubject$.next("new");
    }

    /**
     * Clears the processing status and closes the modal
     */
    onQuit() {
        this._statusSubject$.next("");
        this.activeCoverTypesModal.close();
    }

}