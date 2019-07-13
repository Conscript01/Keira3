import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap';
import { instance } from 'ts-mockito';
import { HighlightModule } from 'ngx-highlightjs';

import { ItemSelectorModalComponent } from '../item-selector/item-selector-modal.component';
import { QueryService } from '../../../../../services/query.service';
import { MockedQueryService } from '../../../../../test-utils/mocks';
import { CommonTestModule } from '../../../../../test-utils/common-test.module';
import { CommonEditorTestModule } from '../../../../../test-utils/common-editor-test-module';
import { highlightOptions } from '../../../../../config/highlight.config';
import { SearchService } from '../../../../../services/search/search.service';
import { ItemTemplate } from '../../../../../types/item-template.type';
import { ItemSearchService } from '../../../../../services/search/item-search.service';
import { SearchSelectorModalComponent } from './search-selector-modal.component';

describe('SearchSelectorModalComponent', () => {
  let component: SearchSelectorModalComponent;
  let fixture: ComponentFixture<ItemSelectorModalComponent>;
  let searchService: SearchService<ItemTemplate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSelectorModalComponent ],
      imports: [
        CommonTestModule,
        CommonEditorTestModule,
        HighlightModule.forRoot(highlightOptions),
      ],
      providers: [
        BsModalRef,
        { provide: QueryService, useValue: instance(MockedQueryService) },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    searchService = TestBed.get(ItemSearchService);
    searchService.query = '--mock query';

    fixture = TestBed.createComponent(ItemSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onSelect() should correctly work', () => {
    const field = 'myField';
    const value = 'mock-value';
    component['entityIdField'] = field;

    component.onSelect({ selected: [{ [field]: value }]});

    expect(component.value).toEqual(value);
  });
});