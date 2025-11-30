import React from 'react';

function OrderProgress({ isOrderComplete = false }) {
    const steps = [
        { id: 1, label: '장바구니', status: 'completed' },
        { id: 2, label: '주문결제', status: isOrderComplete ? 'completed' : 'current' },
        { id: 3, label: '주문완료', status: isOrderComplete ? 'current' : 'pending' },
    ];

    return (
        <div className="order-progress">
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
                                    step.status === 'completed' ? 'active' : 'inactive'
                                }`}
                            ></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default OrderProgress;
