
import React from 'react';
import { AnswerData, TemplateId } from '../types';
import { OneCupTemplate } from './templates/OneCupTemplate';
import { ZenTemplate } from './templates/ZenTemplate';
import { CosmicTemplate } from './templates/CosmicTemplate';
import { BauhausTemplate } from './templates/BauhausTemplate';

interface Props {
  data: AnswerData;
  onReset: () => void;
  templateId: TemplateId;
}

const AnswerCard: React.FC<Props> = ({ data, onReset, templateId }) => {
  switch (templateId) {
    case 'zen':
      return <ZenTemplate data={data} onReset={onReset} />;
    case 'cosmic':
      return <CosmicTemplate data={data} onReset={onReset} />;
    case 'bauhaus':
      return <BauhausTemplate data={data} onReset={onReset} />;
    case 'one-cup':
    default:
      return <OneCupTemplate data={data} onReset={onReset} />;
  }
};

export default AnswerCard;
