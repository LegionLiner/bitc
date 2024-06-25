
        &_time {
            font-size: 14px;
            font-weight: 600;
            color: #A9A9A9;
        }
    }

    &__bunch {
        display: grid;
        grid-template-columns: 1.5fr 1fr 27px;
        font-size: 20px;

        @media screen and (max-width: 900px) {
            font-size: 16px;
        }
    }

    &__info {
        display: flex;
        gap: 52px;
        font-size: 16px;
        font-weight: 400;

        @media screen and (max-width: 900px) {
            flex-wrap: wrap;
            gap: 20px;
            font-size: 14px;
        }

        &_title {
            color: #828D96;

            @media screen and (max-width: 900px) {
                font-size: 14px;
            }
        }

        &_data {
            width: 110%;
            color: #272D37;
            display: flex;
            align-items: center;
            gap: 8px;

            @media screen and (max-width: 900px) {
                font-size: 14px;
            }
        }
    }

    &__payment {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        @media screen and (max-width: 900px) {
            font-size: 14px;
        }

        &_point {
            padding: 2px 10px;
            border-radius: 100px;
            background: #F8FAFC;

        }
    }

    &__comment {
        display: flex;
        justify-content: space-between;
    }

    &__footer {
        padding: 24px;
        background: #F8FAFC;
        display: flex;
        flex-direction: column;
        border-radius: 0px 0px 12px 12px;
        gap: 24px;

        &_info {
            display: flex;
            gap: 42px;

            @media screen and (max-width: 900px) {
                flex-wrap: wrap;
                gap: 20px;
            }
        }

        &_allcomment {
            font-size: 12px;
            font-weight: 400;
            height: auto;
        }

        &_comment {
            position: relative;
            font-size: 12px;
            font-weight: 400;
            max-height: 36px;
            overflow: hidden;



            &::after {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
                background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(#F8FAFC));
            }
        }

        &_arrow {
            min-width: 24px;
        }
    }
}

.color {
    &_red {
        color: #F04C4C;
    }

    &_orange {
        color: #EB930F;
    }

    &_green {
        color: #219653;
    }
}
</style>