import {Space, Drawer, Image} from 'antd';
import {formatBytes} from '../../Utils/Helper/DataConverter';
import moment from 'moment';
const Properties = ({ open, onClose, properties }) => {
    return <Drawer open={open} title="Details" onClose={onClose}>
				{properties && (
					<Space direction="vertical">
						{properties.mimetype !== "folder" ? (
							<Image src={properties.url} preview={false} />
						) : (
							""
						)}
						<div className="metadata">
							<div className="data">
								<p>Name</p>
								<span>{properties.originalName}</span>
							</div>
							<div className="data">
								<p>Type</p>
								<span>{properties.mimetype}</span>
							</div>
							<div className="data">
								<p>Size</p>
								<span>{formatBytes(properties.size)}</span>
							</div>
							<div className="data">
								<p>Modified</p>
								<span>
									{moment
										.unix(properties.date_modified)
										.format("DD/MM/YYYY hh:mm A")}
								</span>
							</div>
							<div className="data">
								<p>Author</p>
								<span>{properties.author}</span>
							</div>
						</div>
					</Space>
				)}
			</Drawer>
} 

export default Properties;