import React from 'react';

function CartProgress() {
    const steps = [
        // { id: 1, label: '장바구니', status: 'completed' },
        // { id: 2, label: '주문결제', status: 'current' },
        // { id: 3, label: '주문완료', status: 'pending' },

        //장바구니 페이지
        { id: 1, label: '장바구니', status: 'current' },
        { id: 2, label: '주문결제', status: 'pending' },
        { id: 3, label: '주문완료', status: 'pending' },

        // 주문완료 페이지
        // { id: 1, label: '장바구니', status: 'completed' },
        // { id: 2, label: '주문결제', status: 'completed' },
        // { id: 3, label: '주문완료', status: 'current' }
    ];

    return (
        <div className="cart-progress">
            <div className="progress-bar">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className={`progress-step ${step.status}`}>
                            <div className="step-circle"></div>
                            <span className="step-label">{step.label}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`progress-line ${
                                    steps[index + 1].status === 'pending' ? 'inactive' : 'active'
                                }`}
                            ></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default CartProgress;
