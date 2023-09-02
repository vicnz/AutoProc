import { AppleOutlined, AppstoreOutlined, BarsOutlined, CheckOutlined, CommentOutlined, CustomerServiceOutlined, DatabaseOutlined, EditOutlined, ExportOutlined, EyeFilled, EyeOutlined, FolderViewOutlined } from "@ant-design/icons";
import { Button, Divider, FloatButton, Form, Input, Popover, Segmented, SegmentedProps, Space, Switch, Tooltip } from "antd";
import { SegmentedLabeledOption, SegmentedValue } from "antd/es/segmented";

const items = [
    {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit',
        title: 'edit'
    },
    {
        key: 'preview',
        icon: <DatabaseOutlined />,
        label: 'Preview',
        title: 'preview',
    }
]

const PurchaseRequest = function () {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', paddingRight: '25px' }}>
                <div>Purchase Request</div>
                <Segmented options={[
                    {
                        label: 'Edit',
                        value: 'Edit',
                        icon: <EditOutlined />,
                    },
                    {
                        label: 'Preview',
                        value: 'Preview',
                        icon: <EyeOutlined />,
                    },
                ]} />
                <Popover title={"APPROVED"} content={<div>Mark the Document as Final</div>} placement="bottomRight">
                    <Switch checkedChildren={<CheckOutlined />} />
                </Popover>
            </div>
            <div style={{ position: 'relative', overflowY: 'auto', height: 'calc(100vh - 168px)', width: 'inherit' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: 'auto', width: 'inherit', paddingRight: '25px' }}>
                    <p style={{ textAlign: 'justify' }}>
                        <Form.Item colon label="PR Number">
                            <Input addonAfter={<AppleOutlined />} />
                        </Form.Item>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident rem asperiores fugiat beatae fuga ut laboriosam maxime, perferendis eveniet maiores incidunt laudantium. Similique est ex nulla voluptatibus cumque dolores culpa sit impedit reprehenderit pariatur eligendi consequatur aut quo, fugit delectus officia deserunt possimus ratione in! Magni quaerat iure voluptatibus quibusdam necessitatibus aperiam temporibus qui magnam ipsum sint, quas veritatis, dolore dolor esse, doloribus accusamus id? Officiis dolore obcaecati deleniti cumque fugit excepturi, ducimus rerum qui culpa. Dicta unde aliquam amet ipsum porro provident voluptate debitis quod itaque deserunt quis, eos numquam tempora perspiciatis expedita! Ratione earum error maiores labore neque autem vitae nisi aliquid laboriosam eos reiciendis porro, quo obcaecati perspiciatis nobis doloribus quibusdam eligendi, aspernatur in corrupti officiis cupiditate! Omnis pariatur cum corrupti ab fuga voluptates ipsam inventore sint placeat dicta! Odio rem magnam soluta delectus eos! Alias dicta tempore tenetur et commodi voluptate architecto doloribus? Ea, optio magnam explicabo, eum labore hic quae inventore minus esse incidunt asperiores. Doloribus, debitis. Dicta iure corporis reprehenderit minima, iste sunt minus accusantium aperiam culpa! Esse quam nam dolor blanditiis suscipit facilis molestiae, dolore tenetur sint repellat quod aliquid ratione magni illum quasi cum. Qui, sunt repellat? Omnis eligendi quas quo, illum consequatur facilis ea. Minus quaerat distinctio eius totam officiis animi doloribus molestias iste aut ut, impedit inventore eveniet voluptatibus quibusdam voluptas facere nisi nam delectus voluptatem fugit et? Est iusto minima aliquid excepturi? Fugit dicta assumenda tempora. Doloremque, cumque laborum molestias sunt, quisquam recusandae voluptates distinctio odio veritatis fuga obcaecati veniam magnam? Atque ex, sunt corrupti at porro fuga eum necessitatibus dolores tempore itaque vero accusantium fugit ducimus deleniti doloremque. Itaque dolorum sapiente possimus numquam nobis eos, iure, voluptatem similique, cupiditate sed neque vitae aut et dicta corporis. Repudiandae, a officia quod nemo non doloremque odit, reprehenderit suscipit velit ad aliquam eveniet animi voluptatum ab dolores quos. Quos, non laboriosam magnam consequatur reprehenderit doloremque libero dolorum, est illum minima laborum eos quam? Ipsa cupiditate molestiae, voluptatem eveniet at assumenda vero aliquid quidem suscipit doloremque et voluptate adipisci ab. Illo minus itaque sit blanditiis deserunt, rem voluptas? Recusandae voluptatibus necessitatibus laudantium. Architecto, ratione recusandae necessitatibus magnam dolor, ipsa saepe commodi quod harum at perspiciatis porro culpa! Dolor enim, et obcaecati suscipit rem cumque non tempore doloremque. Magnam voluptatibus odio natus cum cupiditate minima ratione, at enim quod reprehenderit. Nesciunt esse blanditiis obcaecati quod perferendis maxime dolore, ducimus libero quibusdam ipsa laudantium dolores quo cum suscipit incidunt iure quae porro voluptates corporis temporibus? Culpa vero similique officiis expedita perferendis cumque excepturi architecto quae saepe? At possimus molestiae hic fugit numquam tempore, maxime saepe laboriosam fuga, beatae vitae nemo odio, nostrum consequuntur delectus? Id quibusdam omnis nostrum in facere laudantium cupiditate tempora, placeat quis, consequuntur odio, quae dolor? Dignissimos corrupti corporis quisquam consequatur magni id adipisci quas ratione error obcaecati deserunt rerum sapiente est delectus odio eveniet rem reiciendis velit quaerat culpa, optio nesciunt esse recusandae? Aliquam ab dolore sunt nulla assumenda aut temporibus fuga, illum perferendis ullam voluptas repudiandae qui eos? Nihil illum culpa impedit explicabo velit. Saepe aliquam repellat inventore excepturi odio impedit omnis maiores. Quidem incidunt molestiae quasi. Impedit facere hic adipisci accusantium minus perspiciatis itaque id quas assumenda commodi temporibus unde harum odit ab animi, laudantium quaerat sed nam minima quae iste vel in natus. Tempora possimus odit eveniet sed sit dolorum eaque, commodi nostrum voluptates consectetur autem exercitationem molestiae velit itaque ut minima mollitia nisi dicta iusto magni et sunt deserunt quidem neque? Magnam vel repellendus sed nesciunt ipsa sequi optio ab corporis totam soluta facilis voluptatem iste expedita provident, quisquam dicta consequuntur iusto quod necessitatibus repellat aspernatur ipsam. Nisi culpa at earum iure architecto laudantium quasi in veniam fuga quisquam aut incidunt similique harum cupiditate assumenda dolore cum dolor doloremque, suscipit nemo officia explicabo. Inventore exercitationem perferendis modi odit, corporis alias cupiditate nesciunt in nobis molestias ad aspernatur magnam laboriosam sed? Exercitationem magni officia dolore porro corrupti error! Nesciunt incidunt ullam ipsa? Dignissimos, ut optio asperiores nobis repudiandae eveniet odit quos quidem, debitis vero quasi iure, nostrum eius voluptate temporibus accusantium nesciunt consequuntur iste reprehenderit vitae veniam unde. Placeat ea consequatur eligendi amet, quibusdam architecto beatae. Ea, expedita necessitatibus, ipsa est dolor ab enim doloribus, hic cum nulla pariatur. Ipsam fugit nihil velit iusto blanditiis maiores sit perferendis molestias ad minus iste deleniti architecto repellendus, quis facilis corporis harum laudantium! Molestias iusto omnis velit quibusdam quam? Nam praesentium obcaecati illum vel suscipit accusamus ex eos optio ab explicabo voluptatum rem amet dignissimos nostrum numquam aliquam sequi iure est eaque eligendi autem necessitatibus, adipisci esse. Debitis consectetur sunt deleniti expedita ad rem? Necessitatibus culpa quos, deserunt ullam reprehenderit aut quo odit. Nisi exercitationem odio deleniti blanditiis consequatur debitis unde, velit, rem accusantium expedita laborum modi fuga explicabo esse necessitatibus. Praesentium officia consequuntur, reprehenderit enim iusto aspernatur ratione. Non quasi recusandae error porro nemo deserunt deleniti maxime exercitationem nesciunt veritatis incidunt nostrum eaque quisquam aut impedit, magnam veniam ad repudiandae ratione et distinctio. Praesentium ex iusto quisquam qui ad nisi rerum alias molestias blanditiis dolor eaque temporibus magnam cupiditate nemo, laboriosam eius recusandae magni? Esse cumque, quibusdam sint quis iusto, facilis labore debitis omnis molestiae velit maiores corrupti vel delectus laudantium odio id quae temporibus sequi cum incidunt sunt. Animi blanditiis quam quis quo fugit nihil sed mollitia doloribus quidem adipisci laboriosam accusamus repellendus ea laudantium quisquam porro quaerat iste earum atque facilis tempora, labore recusandae. Nemo voluptatem architecto quia repudiandae. Ab iusto itaque repellat laborum veniam sapiente ipsum! Adipisci necessitatibus maxime error provident repellat est sit, assumenda veritatis inventore? Magnam commodi nostrum nam, cupiditate fugit nulla dolore est porro necessitatibus tempora iusto beatae saepe non voluptatem quos maiores labore dolores earum aliquam eum illo facere, voluptas ipsum pariatur. Doloribus veniam velit et voluptates quis voluptas error, pariatur odio? Commodi in officiis dolore tenetur perspiciatis libero vero quasi aperiam. Illo consectetur, voluptas sit ab alias vel rerum nostrum iure beatae iste fugit sint, velit eaque at ducimus quisquam dolorum ex reiciendis consequatur rem? Ducimus aliquam et illum est quibusdam.
                    </p>
                </div>
            </div>
        </>
    )
}

export default PurchaseRequest;