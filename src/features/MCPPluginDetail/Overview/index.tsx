import { Collapse, Flexbox, Markdown } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDetailContext } from '../DetailProvider';
import TagList from './TagList';

const Overview = memo<{ inModal?: boolean }>(() => {
  const { t } = useTranslation('discover');
  const { tags = [], description, overview } = useDetailContext();

  const summary = overview?.summary || description;

  return (
    <Flexbox gap={48}>
      <Collapse
        defaultActiveKey={['summary']}
        expandIconPlacement={'end'}
        variant={'outlined'}
        items={[
          {
            children: !!summary ? <Markdown>{summary}</Markdown> : summary,
            key: 'summary',
            label: t('mcp.details.summary.title'),
          },
        ]}
      />
      <Flexbox gap={16}>
        {overview?.readme && <Markdown allowHtml>{overview.readme.trimEnd()}</Markdown>}
        <TagList tags={tags} />
      </Flexbox>
    </Flexbox>
  );
});

export default Overview;
