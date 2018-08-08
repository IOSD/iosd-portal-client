import React, {Component} from 'react';
import {Card, Row, Col, Form, Input, Button, Upload, Icon, Divider, message} from 'antd' ;
import {Link} from 'react-router-dom' ;
import server from '../../../actions/server.config';
const FormItem = Form.Item;
const {TextArea} = Input;

const props = {
    name: 'file',
    action: `${server.base_url}/api/v1/uploads`
};

class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.book ? props.book.name : '',
            author: props.book ? props.book.author : '',
            description: props.book ? props.book.description : '',
            year: props.book ? props.book.year : '',
            image: props.book ? props.book.image : '',
            color: props.book ? props.book.color : '',
            category: props.book ? props.book.category : '',
            link: props.book ? props.book.link : ''
        };
    };

    handleUpload = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            console.log(info.file.response);
            this.setState({link: info.file.response.url});

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values = {
                    ...values,
                    link: this.state.link
                };
                this.props.onSubmit(values);
                this.props.form.resetFields();
            }
        });
    };

    componentDidMount() {
        console.log("did mount");
        const {setFieldsValue} = this.props.form;

        setFieldsValue({
            name: this.state.name,
            author: this.state.author,
            description: this.state.description,
            year: this.state.year,
            image: this.state.image,
            color: this.state.color,
            category: this.state.category
        });
    }

    renderCard(values) {
        const isEmpty = Object.values(values).every(x => (x === null || x === undefined));
        return (
            <Card>
                <Row>
                    <Col>
                        <h4>Preview</h4>
                    </Col>
                </Row>
                <Divider/>
                {isEmpty ? <h3>Start Filling the form to see the preview</h3>
                    : <article className="item-pane">
                        <div className="item-preview">
                            {values.image &&
                            <div className="book" style={
                                {
                                    background: `url('${values.image}')`,
                                    '--before-bg': `${values.color}`

                                }} data-color={values.color}>
                            </div>
                            }
                        </div>
                        <div className="item-details">
                            <h1>{values.name}</h1><span className="subtitle">{values.author}</span>
                            {values.description &&
                            <div className="pane__section">
                                <p>
                                    {values.description}
                                </p>
                            </div>
                            }
                            <div className="pane__section clearfix">
                                <Button size='large' className='button-solid'>
                                    Download
                                </Button>
                            </div>
                        </div>
                    </article>
                }
            </Card>
        );
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Row>
                    <Col>
                        <Card className="my-4">
                            <Form layout="inline" onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        <h4>{this.props.book ? 'Edit Book' : 'Add New Book'}</h4>
                                    </Col>
                                </Row>

                                <Divider/>

                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            label="Book Name"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                            {getFieldDecorator('name', {
                                                rules: [{required: true, message: 'Please input your Book name!'}],
                                            })(
                                                <Input placeholder="Book Name"/>
                                            )}
                                        </FormItem>
                                    </Col>

                                    <Col span={12}>
                                        <FormItem
                                            label="Author Name"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                            {getFieldDecorator('author', {
                                                rules: [{required: true, message: 'Please input Author name!'}],
                                            })(
                                                <Input placeholder="Author name"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            label="Book Description"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                            {getFieldDecorator('description', {
                                                rules: [{required: true, message: 'Please input book description!'}],
                                            })(
                                                <TextArea placeholder="description"
                                                          autosize={{minRows: 2, maxRows: 10}}/>
                                            )}
                                        </FormItem>
                                    </Col>

                                    <Col span={12}>
                                        <FormItem
                                            label="Select Publication Year"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                            {getFieldDecorator('year', {
                                                rules: [{required: true, message: "Please select a Publication date"}]
                                            })(
                                                <Input placeholder='year' type='number'/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>

                                    <Col span={12}>
                                        <FormItem
                                            label="Book Category"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                            {getFieldDecorator('category', {
                                                rules: [{required: true, message: 'Please Input Book Category'}],
                                            })(
                                                <Input placeholder="Category"/>
                                            )}
                                        </FormItem>
                                    </Col>

                                    <Col span={12}>
                                        <FormItem
                                            label="Book Colour"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                            {getFieldDecorator('color', {
                                                rules: [{required: true, message: 'Please Input Book Colour'}],
                                            })(
                                                <Input placeholder="Colour"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            label="Image Link"
                                            colon={true}
                                            wrapperCol={{span: 24}}
                                        >
                                            {getFieldDecorator('image', {
                                                rules: [{required: true, message: 'Please Input Image link!'}],
                                            })(
                                                <Input placeholder="Image Link"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Divider/>

                                <Row>
                                    <Col span={8}>
                                        <Upload {...props} onChange={this.handleUpload}>
                                            <Button type='primary'>
                                                <Icon type="upload"/>
                                                Upload Book
                                            </Button>
                                        </Upload>
                                    </Col>
                                    <Col span={16}>
                                        <div className="float-right">
                                            <Link to={'/library'}>
                                                <Button
                                                    style={{marginRight: '1.2rem'}}
                                                    type="primary"
                                                >

                                                    Go Back
                                                </Button>
                                            </Link>
                                            <Button
                                                style={{marginRight: '1.2rem'}}
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Submit
                                            </Button>
                                            <Button
                                                type="danger"
                                                onClick={() => this.props.form.resetFields()}
                                            >
                                                Reset
                                            </Button>

                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col>
                        <div className="my-4">
                            {this.renderCard(this.props.form.getFieldsValue())}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
};

const BookNewForm = Form.create()(BookForm);
export default BookNewForm;