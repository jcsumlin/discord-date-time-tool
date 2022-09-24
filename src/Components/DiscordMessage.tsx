// @flow
import * as React from 'react';
import { Tooltip, Typography } from '@mui/material';
import moment from 'moment';

type Props = {
  userName: string
  avatarUrl: string,
  format: string,
  dateTime: moment.Moment | null
};

export default function DiscordMessage({
  userName, avatarUrl, format, dateTime,
}: Props) {
  let message;
  if (dateTime) {
    if (format === 'fromNow') {
      message = dateTime.fromNow();
    } else {
      message = dateTime.format(format);
    }
  }
  return (
    <div className="flex my-4">
      <img src={avatarUrl} alt="" className="inline rounded-full h-[40px] my-auto" />
      <div className="block ml-4">
        <Typography>
          <span className="hover:underline">{userName}</span>
          <span className="text-xs ml-2">
            {' Today at '}
            {moment().format('H:mm A')}
          </span>
        </Typography>
        <Tooltip title={dateTime ? dateTime.format('dddd, MMMM D, YYYY h:mm A') : ''} arrow placement="top" describeChild>
          <Typography className="discord-message w-fit">{message}</Typography>
        </Tooltip>
      </div>

    </div>
  );
}
