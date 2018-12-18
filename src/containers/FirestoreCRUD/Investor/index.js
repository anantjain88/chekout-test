import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input, { InputSearch } from '../../../components/uielements/input';
import Modal from '../../../components/feedback/modal';
import actions from '../../../redux/investors/actions';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import Popconfirms from '../../../components/feedback/popconfirm';
import PageHeader from "../../../components/utility/pageHeader";
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { Icon } from 'antd';
import firebase from 'firebase';
import { firebaseConfig } from '../../../settings';
import Duplex from '../../../image/duplex.jpg';

import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  ButtonHolders,
} from './investors.style';
import clone from 'clone';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storageRef = firebase.storage().ref();

class Investors extends Component {
  constructor(props){
    super(props);
    this.state ={
      file: '',
      uploading: false,
    }
  }
  componentDidMount() {
    this.props.loadFromFireStore();
  }

  handleRecord = (actionName, investor) => {
    let fileName = this.state.file.name
    investor.image = fileName
    if (investor.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(investor, actionName);
    this.setState({uploading: true})
    storageRef.child('images/'+fileName)
      .put(this.state.file)
      .then(snap => {
        this.setState({uploading: false})
        // the loading percent logic here?
        // how do i keep tabs on the percent?
      })
      .catch(err => this.setState({error: err.message}))
  };

  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (investor = null) => {
    this.props.toggleModal(investor);
  };

  onRecordChange = (key, event) => {
    let { investor } = clone(this.props);
    if (key) investor[key] = event.target.value;
    if(event.target.files !== null){
      this.setState({file: event.target.files[0]})
    }
    this.props.update(investor);
  };

  _fetchFile = async (image)=>{
    let response = null
    let request = await firebase.storage().ref('images').child(image).getDownloadURL();
    return request
  }

  render() {
    const { modalActive, investors } = this.props;
    const { investor } = clone(this.props);
    const dataSource = [];
    Object.keys(investors).map((investor, index) => {
      return dataSource.push({
        ...investors[investor],
        key: investor,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: '#',
        className:'table_id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        },
      },
      {
        title: '',
        className:'table_img',
        key: 'image',
        render: (text, row) => {
            return(<span>
               <span className="object-image">
                <img src={Duplex}/>
              </span>
            </span>)
        },
      },
      {
        title: 'Name',
        className:'table_cname',
        key: 'company_name',
        render: (text, row) => {
            return(<span>
              <span>
                {row.company_name}
              </span>
              <br/>
              <span>
                {row.investment_count}
              </span>
              <br/>
              <span>
                {row.location}
              </span>
            </span>)
        },
      },
      {
        title: 'Verwaltung',
        className:'table_aname',
        dataIndex: 'name',
        className:'table_name',
        key: 'name',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        },
      },
      // {
      //   title: 'Job Title',
      //   dataIndex: 'job_title',
      //   key: 'job_title',
      //   sorter: (a, b) => {
      //     if (a.job_title < b.job_title) return -1;
      //     if (a.job_title > b.job_title) return 1;
      //     return 0;
      //   },
      // },
      // {
      //   title: 'Location',
      //   dataIndex: 'location',
      //   key: 'location',
      //   sorter: (a, b) => {
      //     if (a.location < b.location) return -1;
      //     if (a.location > b.location) return 1;
      //     return 0;
      //   },
      // },
      // {
      //   title: 'Info',
      //   dataIndex: 'investment_count',
      //   key: 'investment_count',
      //   width: '190px',
      //   sorter: (a, b) =>
      //     parseInt(a.investment_count, 10) - parseInt(b.investment_count, 10),
      // },
      {
        title: 'Info',
        className:'table_info',
        key: 'exists_count',
        render: (text, row) => {
            return(<span>
              <span>
                {row.exists_count} Personen
              </span>
              <br/>
              <span>
              </span>
              <br/>
              <Button type="default" size="small" style={{backgroundColor:'#cfeee6', color:'#1bbc9b'}}>
                Synced
              </Button>
            </span>)
        },
      },
      // {
      //   title: 'Number of Exists',
      //   dataIndex: 'exists_count',
      //   key: 'exists_count',
      //   width: '160px',
      //   sorter: (a, b) =>
      //     parseInt(a.exists_count, 10) - parseInt(b.exists_count, 10),
      // },
      {
        title: 'Actions',
        className:'table_actions',
        width: '60px',
        key: 'action',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to delete this record?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
              </Popconfirms>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <div className="container object-module">
      <LayoutContentWrapper>
      <div className="object-title">
        <TitleWrapper>
            <PageHeader>Objekte</PageHeader>
            <div>Ihre Objekte im Überblick</div>
        </TitleWrapper>
        </div>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <InputSearch
                  placeholder="In Objekte suchen…"
                  onSearch={this.onSearch}
                  className="search-input"
            />
            <Icon type="caret-down" className="dd-icon" />
            <ActionBtn
                  type="primary"
                  // onClick={this.handleModal.bind(this, null)}
                >
                  Baujahr
            </ActionBtn>
            <ActionBtn
                  type="default"
                  // onClick={this.handleModal.bind(this, null)}
                >
                  Ort
            </ActionBtn>
            <ActionBtn
                  type="default"
                  // onClick={this.handleModal.bind(this, null)}
                >
                Grundfläche
            </ActionBtn>
            <ActionBtn
                  type="primary"
                  // onClick={this.handleModal.bind(this, null)}
                >
                <Icon type='left' style={{color:'white'}}/>
                  100.000 CHF
            </ActionBtn>
            <ActionBtn
                  type="default"
                  // onClick={this.handleModal.bind(this, null)}
                >
                Zurücksetzen
              <Icon type='close'/>
            </ActionBtn>
          </ContentHolder>
        </Box>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Liegenschaft (8)</ComponentTitle>

              <ButtonHolders>
                {/* <ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                </ActionBtn> */}

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Objekt Hinzufügen
                <Icon type='plus' style={{color:'white'}}/>
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={investor.key ? 'Update investor' : 'Add New investor'}
              okText={investor.key ? 'Update investor' : 'Add investor'}
              onOk={this.handleRecord.bind(this, 'insert', investor)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Admin Name</Label>
                  <Input
                    label="Name"
                    placeholder="Enter owner name"
                    value={investor.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Company Name</Label>
                  <Input
                    label="Company Name"
                    placeholder="Enter the company name"
                    value={investor.company_name}
                    onChange={this.onRecordChange.bind(this, 'company_name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Range</Label>
                  <Input
                    label="Range"
                    placeholder="Enter the Range"
                    value={investor.range}
                    onChange={this.onRecordChange.bind(this, 'range')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Location</Label>
                  <Input
                    label="Location"
                    placeholder="Enter Description"
                    value={investor.location}
                    onChange={this.onRecordChange.bind(this, 'location')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Number of Investments</Label>
                  <Input
                    label="Number of Investments"
                    placeholder="Enter number of investments"
                    value={investor.investment_count}
                    onChange={this.onRecordChange.bind(
                      this,
                      'investment_count'
                    )}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Number of Exists</Label>
                  <Input
                    label="Number of Exists"
                    placeholder="Enter Number of Exists"
                    value={investor.exists_count}
                    onChange={this.onRecordChange.bind(this, 'exists_count')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Image</Label>
                  <Input
                    type="file"
                    label="Image"
                    placeholder="Enter valid image"
                    value={investor.image}
                    onChange={this.onRecordChange.bind(this, 'image')}
                  />
                </Fieldset>
              </Form>
            </Modal>
          
            <TableWrapper
              rowKey="key"
              columns={columns}
              rowSelection={rowSelection}
              loading={this.props.isLoading}
              dataSource={dataSource}
              className="isoSimpleTable"
              pagination={{
                // defaultPageSize: 1,
                hideOnSinglePage: true,
                total: dataSource.length,
                showTotal: (total, range) => {
                  return `Showing ${range[0]}-${range[1]} of ${
                    dataSource.length
                  } Results`;
                },
              }}
            />
          </ContentHolder>
        </Box>
      </LayoutContentWrapper>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.Investors,
  }),
  actions
)(Investors);
