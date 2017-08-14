import {Component, ViewEncapsulation, ViewChild, QueryList, Query} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import {GlobalState} from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import {ValidatorUtils} from '../../../../validator/validator.utils';
import { RouteService } from '../../../../service/route';

import { PopDialogComponent } from '../../../../components/pop-dialog'

import { ProjectService } from '../../../../service/project';
import { UserService } from '../../../../service/user';

declare var jQuery;

@Component({
  selector: 'project-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html'
})
export class ProjectEdit implements OnInit, AfterViewInit {
  type: string;
  id: number;
  model: any = {};
  groups: any[] = [];
  projectRoles: any[] = [];
  user: any = {roleId: 2};
  userSearchResult: any[];
  fromEnter: boolean = false;
  userRoles: any[] = [];
  formInfo: FormGroup;
  formAdd: FormGroup;

  tab: string = 'info';

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state:GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private _projectService: ProjectService, private _userService: UserService) {
    let that = this;

    this._route.params.subscribe(params => {
      that.type = params['type'];
      that.id = +params['id'];

      that.loadData();
    });

    that.buildForm();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  buildForm(): void {
    let that = this;

    let parentValidate = [];
    if (that.type === 'project') {
      parentValidate = [Validators.required];
    }
    this.formInfo = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'descr': ['', []],
        'parentId': ['', parentValidate],
        'disabled': ['', []]
      }, {}
    );

    this.formInfo.valueChanges.debounceTime(500).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    this.formAdd = this.fb.group(
      {
        'userName': ['', [Validators.required]],
        'userRole': ['', [Validators.required]]
      }, {}
    );
    this.formAdd.controls['userName'].valueChanges.debounceTime(500).subscribe(data => this.onUsernameChanged(data));

  }
  onValueChanged(data?: any) {
    let that = this;
    that.formErrors = ValidatorUtils.genMsg(that.formInfo, that.validateMsg, []);
  }
  onUsernameChanged(kewwords?: string) {
    if (!kewwords || this.fromEnter) {
      this.userSearchResult = null;
      this.fromEnter = false;
      return;
    }

    this._userService.search(this.model.orgId, kewwords).subscribe((json:any) => {
      if (json.data.length == 0) {
        this.userSearchResult = null;
      } else {
        this.userSearchResult = json.data;
      }

    });
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required':      '姓名不能为空'
    },
    'parentId': {
      'required':      '项目组不能为空'
    }
  };

  loadData() {
    let that = this;

    that._projectService.get(that.id).subscribe((json:any) => {
      that.projectRoles = json.projectRoles;
      that.groups = json.groups;
      that.model = !!json.data? json.data: {type: that.type, disabled: false};
    });
  }

  save() {
    let that = this;

    that._projectService.save(that.model).subscribe((json:any) => {
      if (json.code == 1) {
        that.model = json.data;

        that.formErrors = ['保存成功'];
        that._routeService.navTo("/pages/project/list");
      } else {
        that.formErrors = ['保存失败'];
      }
    });
  }

  delete() {
    let that = this;

    that._projectService.delete(that.model.id).subscribe((json:any) => {
      if (json.code == 1) {
        that.model = json.data;

        that.formErrors = ['删除成功'];
        that._routeService.navTo("/pages/project/list");

        this.modalWrapper.closeModal();
      } else {
        that.formErrors = ['删除失败'];
      }
    });
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

  tabChange(event: any) {
    this.tab = event.nextId;
  }

  selectUser(user: any) {
    this.userSearchResult = null;
    this.user = user;
    if (!this.user.roleId) {
      this.user.roleId = 2;
    }
  }
  onEnter(e) {
    console.log('enter', this.userSearchResult);
    e.preventDefault();
    e.stopPropagation();

    if (!this.userSearchResult) {
      return;
    }

    this.user = this.userSearchResult[0];
    if (!this.user.roleId) {
      this.user.roleId = 2;
    }
    this.userSearchResult = null;
    this.fromEnter = true;
  }

  add() {
    console.log('add');
  }

}

