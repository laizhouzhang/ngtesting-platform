import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {GlobalState} from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import {ValidatorUtils, EmailValidator, PhoneValidator} from '../../../../validator';
import { RouteService } from '../../../../service/route';

import { GroupService } from '../../../../service/group';

declare var jQuery;

@Component({
  selector: 'group-edit',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./edit.scss')],
  template: require('./edit.html')
})
export class GroupEdit implements OnInit, AfterViewInit {

  id: number;
  tab: string = 'info';

  group: any = {disabled: false};
  users: any[] = [];
  form: FormGroup;
  isSubmitted: boolean;
  @ViewChild('modal') modal: ModalDirective;

  constructor(private _state:GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private groupService: GroupService) {

  }
  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    this.loadData();
    this.buildForm();
  }
  ngAfterViewInit() {}


  selectTab(tab: string) {
    let that = this;
    that.tab = tab;
  }

  buildForm(): void {
    let that = this;
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'descr': ['', []],
        'disabled': ['', []]
      }, {}
    );

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    let that = this;
    that.formErrors = ValidatorUtils.genMsg(that.form, that.validateMsg, []);
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required':      '姓名不能为空'
    },
    'descr': {}
  };

  loadData() {
    let that = this;
    that.groupService.get(that.id).subscribe((json:any) => {
      that.group = json.group;
      that.users = json.users;

      _.forEach(that.users, (user: any, index: number) => {
        this.form.addControl('user-' + user.id, new FormControl('', []))
      });
    });
  }

  save() {
    let that = this;

    that.groupService.save(that.group, that.users).subscribe((json:any) => {
      if (json.code == 1) {

        that.formErrors = ['保存成功'];
        that._routeService.navTo("/pages/org-admin/group/list");
      } else {
        that.formErrors = ['保存失败'];
      }
    });
  }

  delete() {
    let that = this;

    that.groupService.delete(that.group.id).subscribe((json:any) => {
      if (json.code == 1) {
        that.formErrors = ['删除成功'];
        that._routeService.navTo("/pages/org-admin/group/list");
      } else {
        that.formErrors = ['删除失败'];
      }
    });
  }

  select(key: string) {
    let val = key ==='all'? true: false;
    for (let user of this.users) {
      user.selecting = val;
    }
  }
  reset() {
    this.loadData();
  }

  showModal(): void {
    this.modal.show();
  }
  onModalShow():void {
    // init jquery components if needed
  }

  hideModal(): void {
    this.modal.hide();
  }

}
