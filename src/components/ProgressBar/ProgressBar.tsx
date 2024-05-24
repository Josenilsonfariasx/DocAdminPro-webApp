import { Card, ProgressBar } from '@tremor/react';
export interface Props{
  value: string | undefined | Number | null;
}

export function ProgressBarStorage({value}:Props) {
  const valueInGB = Number(value) / 1024;
  const percentage = (valueInGB / 2) * 100;

  return (
    <div className='max-w-5xl m-auto'>
      <Card className=" max-w-full sm:max-w-[500px]">
        <p className='font-mono'>Armazenamento Usado {value ? value.toString(): ''} Mb</p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span className='font-mono'>{percentage.toFixed(2)}%</span>
          <span className='font-mono'>2GB</span>
        </p>
        <ProgressBar value={percentage} color='yellow' className="mt-3 w-full sm:min-w-[300px]" />
      </Card>
    </div>
  );
}