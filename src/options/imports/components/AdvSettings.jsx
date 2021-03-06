import React from 'react'
import PropTypes from 'prop-types'
import ButtonTooltip from 'src/common-ui/components/button-tooltip'
import { IMPORT_TYPE as TYPE, IMPORT_SERVICES as SERVICES } from '../constants'

import Concurrency from './Concurrency'
import PrevFailedCheckbox from './PrevFailedCheckbox'

import styles from './AdvSettings.css'

const AdvSettings = ({ onPrevFailedToggle, prevFailedValue, ...props }) => (
    <section className={styles.container}>
        <div className={styles.advFunctionality}>
            <ul className={styles.settingsList}>
                {(props.allowTypes[TYPE.OTHERS] === SERVICES.POCKET ||
                    props.allowTypes[TYPE.OTHERS] === SERVICES.NETSCAPE) && (
                    <li className={styles.settingsListItem}>
                        <label htmlFor="star-imports">
                            'Star' all imported urls
                        </label>
                        <input
                            className={styles.prevFailedCheckbox}
                            id="star-imports"
                            type="checkbox"
                            checked={props.bookmarkImports}
                            onChange={props.onBookmarImportsToggle}
                        />
                    </li>
                )}
                <li className={styles.settingsListItem}>
                    <label htmlFor="index-imports">
                        Only import title, urls and metadata
                    </label>
                    <ButtonTooltip
                        tooltipText="Fast, but not full-text searchable"
                        position="bottom"
                    >
                        <input
                            className={styles.prevFailedCheckbox}
                            id="index-imports"
                            type="checkbox"
                            checked={props.indexTitle}
                            onChange={props.onIndexTitleToggle}
                        />
                    </ButtonTooltip>
                </li>
                <li className={styles.settingsListItem}>
                    <Concurrency {...props} />
                </li>
                <li className={styles.settingsListItem}>
                    <PrevFailedCheckbox
                        checked={prevFailedValue}
                        onChange={onPrevFailedToggle}
                    />
                </li>
            </ul>
        </div>
    </section>
)

AdvSettings.propTypes = {
    allowTypes: PropTypes.shape({
        [TYPE.HISTORY]: PropTypes.bool.isRequired,
        [TYPE.BOOKMARK]: PropTypes.bool.isRequired,
        [TYPE.OTHERS]: PropTypes.string.isRequired,
    }).isRequired,
    bookmarkImports: PropTypes.bool.isRequired,
    indexTitle: PropTypes.bool.isRequired,
    onPrevFailedToggle: PropTypes.func.isRequired,
    prevFailedValue: PropTypes.bool.isRequired,
    onBookmarImportsToggle: PropTypes.func.isRequired,
    onIndexTitleToggle: PropTypes.func.isRequired,
}

export default AdvSettings
