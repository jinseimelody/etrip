import classNames from 'classnames';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {GoKebabHorizontal} from 'react-icons/go';
import {IoMdCheckmark} from 'react-icons/io';
import {RiMastercardLine, RiVisaLine} from 'react-icons/ri';
import image from '~/assets';

const data = [
  {
    group: 'Subscriptions',
    description: 'Earned points are received upon payment successful',
    methods: [
      {
        id: 1,
        primary: true,
        logo: (
          <div className="flex" style={{width: '2.5rem'}}>
            <img alt="" src={image.coetorise} />
          </div>
        ),
        name: 'Coetorise xxxx9460',
        balance: '1000 point'
      }
    ]
  },
  {
    group: 'Saved cards',
    description: 'List of all credit cards you saved',
    methods: [
      {
        id: 2,
        logo: <RiVisaLine style={{fontSize: '3.5rem'}} />,
        name: 'Visa xxxx1657',
        balance: 'Expires on 16/24'
      },
      {
        id: 3,
        logo: <RiMastercardLine style={{fontSize: '2.5rem'}} />,
        name: 'Mastercard xxxx9878',
        balance: 'Expires on 20/28'
      }
    ]
  }
];

const PaymentWidget = forwardRef((_, ref) => {
  const [value, setValue] = useState();

  useImperativeHandle(ref, () => ({
    getValue: () => value
  }));

  return (
    <>
      {data.map((x, i) => (
        <div key={i}>
          <div className="flex flex-start space-between mb-3">
            <div>
              <span className="text-title">{x.group}</span>
              <br />
              <span className="text-muted">{x.description}</span>
            </div>
          </div>
          {x.methods.map((method, j) => (
            <div
              key={j}
              className={classNames('card', 'mb-4', {
                'card-selected': method.primary
              })}
              onClick={() => setValue(method)}>
              <div className="flex">
                <div className="payment-method-logo mr-3">{method.logo}</div>
                <div className="flex-grow-1">
                  <span>{method.name}</span>
                  <br />
                  <span className="text-muted">{method.balance}</span>
                </div>
                {value && value.id === method.id && (
                  <div>
                    <IoMdCheckmark />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
});

export default PaymentWidget;
